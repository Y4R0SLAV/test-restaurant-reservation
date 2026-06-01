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

  return events.map((event) => {
    const start = parseApiDateTime(
      event.kind === 'order' ? event.data.start_time : event.data.seating_time,
    )
    const end = parseApiDateTime(event.data.end_time)

    const startMinutes = getClockMinutesInTimeZone(start, timeZone)
    const endMinutes = getClockMinutesInTimeZone(end, timeZone)

    const topPercent = ((startMinutes - dayStart) / span) * 100
    const heightPercent = Math.max(((endMinutes - startMinutes) / span) * 100, 3)

    return {
      event,
      topPercent: clamp(topPercent, 0, 100),
      heightPercent: clamp(heightPercent, 3, 100 - topPercent),
    }
  })
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}
