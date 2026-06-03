import type { Order, Reservation } from '@/types'
import type { TimelineEvent, TimelineEventLayout, TimeSlot } from '@/types/ui'
import {
  getClockMinutesInTimeZone,
  parseApiDateTime,
  parseClockTime,
} from './datetime'

/** Высота шкалы: ~2px на минуту рабочего дня. */
export const TIMELINE_PX_PER_MINUTE = 2

export function getTimelineSpanMinutes(
  openingTime: string,
  closingTime: string,
): number {
  return Math.max(
    parseClockTime(closingTime) - parseClockTime(openingTime),
    1,
  )
}

export function getTimelineHeightPx(
  openingTime: string,
  closingTime: string,
): number {
  return getTimelineSpanMinutes(openingTime, closingTime) * TIMELINE_PX_PER_MINUTE
}

export const DEFAULT_GRID_STEP_MINUTES = 30

export function buildTimeSlots(
  openingTime: string,
  closingTime: string,
  stepMinutes = DEFAULT_GRID_STEP_MINUTES,
): TimeSlot[] {
  const dayStart = parseClockTime(openingTime)
  const dayEnd = parseClockTime(closingTime)
  const span = Math.max(dayEnd - dayStart, 1)
  const slots: TimeSlot[] = []

  for (let m = dayStart; m <= dayEnd; m += stepMinutes) {
    const h = Math.floor(m / 60)
    const min = m % 60
    slots.push({
      label: `${String(h).padStart(2, '0')}:${String(min).padStart(2, '0')}`,
      topPercent: ((m - dayStart) / span) * 100,
    })
  }

  return slots
}

export function buildTimeCells(
  openingTime: string,
  closingTime: string,
  stepMinutes = DEFAULT_GRID_STEP_MINUTES,
): Array<{ topPercent: number; heightPercent: number; slotStartMinutes: number }> {
  const dayStart = parseClockTime(openingTime)
  const dayEnd = parseClockTime(closingTime)
  const span = Math.max(dayEnd - dayStart, 1)

  const cells: Array<{
    topPercent: number
    heightPercent: number
    slotStartMinutes: number
  }> = []

  for (let m = dayStart; m < dayEnd; m += stepMinutes) {
    const cellStart = m
    const cellEnd = Math.min(m + stepMinutes, dayEnd)

    const topPercent = ((cellStart - dayStart) / span) * 100
    const heightPercent =
      Math.max(((cellEnd - cellStart) / span) * 100, 0.5)

    cells.push({
      topPercent: clamp(topPercent, 0, 100),
      heightPercent: clamp(heightPercent, 0.5, 100 - topPercent),
      slotStartMinutes: cellStart,
    })
  }

  return cells
}

export function toTimelineEvents(
  orders: Order[],
  reservations: Reservation[],
): TimelineEvent[] {
  const orderEvents: TimelineEvent[] = orders.map((data) => ({
    kind: 'order',
    data,
  }))
  const reservationEvents: TimelineEvent[] = reservations.map((data) => ({
    kind: 'reservation',
    data,
  }))
  return [...orderEvents, ...reservationEvents]
}

export function layoutTimelineEvents(
  events: TimelineEvent[],
  openingTime: string,
  closingTime: string,
  timeZone: string,
): TimelineEventLayout[] {
  const dayStart = parseClockTime(openingTime)
  const dayEnd = parseClockTime(closingTime)
  const span = Math.max(dayEnd - dayStart, 1)

  type WithMinutes = {
    layout: Omit<TimelineEventLayout, 'colIndex' | 'colCount' | 'overlapOffsetPx'>
    startMinutes: number
    endMinutes: number
  }

  const prepared: WithMinutes[] = events.map((event) => {
    const start = parseApiDateTime(
      event.kind === 'order' ? event.data.start_time : event.data.seating_time,
    )
    const end = parseApiDateTime(event.data.end_time)

    const startMinutes = getClockMinutesInTimeZone(start, timeZone)
    const endMinutes = getClockMinutesInTimeZone(end, timeZone)

    const topPercent = ((startMinutes - dayStart) / span) * 100
    const heightPercent = Math.max(((endMinutes - startMinutes) / span) * 100, 3)

    return {
      startMinutes,
      endMinutes,
      layout: {
        event,
        topPercent: clamp(topPercent, 0, 100),
        heightPercent: clamp(heightPercent, 3, 100 - topPercent),
      },
    }
  })

  const indexed = prepared
    .map((p, i) => ({ ...p, idx: i }))
    .sort((a, b) => a.startMinutes - b.startMinutes || a.endMinutes - b.endMinutes)

  const GROUP_WINDOW_MINUTES = 30
  const OVERLAP_OFFSET_PX = 4

  // Разбивка на группы по старту
  const groups: typeof indexed[] = []
  let cur: typeof indexed = []
  for (let i = 0; i < indexed.length; i++) {
    const item = indexed[i]
    if (cur.length === 0) {
      cur.push(item)
      continue
    }
    const canJoin = cur.some((g) => Math.abs(g.startMinutes - item.startMinutes) <= GROUP_WINDOW_MINUTES)
    if (canJoin) {
      cur.push(item)
    } else {
      groups.push(cur)
      cur = [item]
    }
  }
  if (cur.length) groups.push(cur)

  const result: TimelineEventLayout[] = new Array(events.length)
  for (const group of groups) {
    // Храним для каждой колонки список добавленных интервалов
    const colIntervals: Array<Array<{ start: number; end: number }>> = []

    for (const item of group) {
      // Поиск подходящей колонки: первый столбец, где последний интервал не пересекается
      let chosenCol = -1
      for (let c = 0; c < colIntervals.length; c++) {
        const lastEnd = colIntervals[c][colIntervals[c].length - 1]?.end ?? -Infinity
        if (lastEnd <= item.startMinutes) {
          chosenCol = c
          break
        }
      }
      if (chosenCol === -1) {
        chosenCol = colIntervals.length
        colIntervals.push([])
      }

      // Добавляем текущий интервал в выбранную колонку
      colIntervals[chosenCol].push({ start: item.startMinutes, end: item.endMinutes })
      // Проверяем, есть ли у этого события хотя бы одно перекрытие с любым другим событием в группе
      const overlapsAny = group.some(
        (g) => g !== item && item.startMinutes < g.endMinutes
      )

      result[item.idx] = {
        ...item.layout,
        colIndex: chosenCol,
        colCount: 0, // будет заполнено после цикла
        overlapOffsetPx: overlapsAny ? OVERLAP_OFFSET_PX : 0,
      }
    }

    const colCount = colIntervals.length
    for (const item of group) {
      result[item.idx].colCount = colCount
    }
  }
  console.log('result: ', result)
  for (let i = 0; i < result.length; i++) {
    const startI = prepared[i].startMinutes
    let overlabCount = 0
    for (let j = 0; j < result.length; j++) {
      const startJ = prepared[j].startMinutes
      const endJ = prepared[j].endMinutes

      if (i !== j && !result[i].colIndex && startI < endJ && startJ < startI && !result[j].colIndex) {
        overlabCount += 1 + (result[j].overlapOffsetPx / OVERLAP_OFFSET_PX);
      }
    }
    result[i].overlapOffsetPx = overlabCount * OVERLAP_OFFSET_PX
  }

  return result
}


function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}