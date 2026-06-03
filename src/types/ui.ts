import type { Order, Reservation } from './booking'

/** Событие на шкале времени стола (заказ или бронь). */
export type TimelineEvent =
  | { kind: 'order'; data: Order }
  | { kind: 'reservation'; data: Reservation }

export interface TimelineEventLayout {
  event: TimelineEvent
  topPercent: number
  heightPercent: number
  /** Колонка в группе наложений. */
  colIndex: number
  /** Количество колонок в группе наложений. */
  colCount: number
  /** Если событие наложилось на другое — дополнительный горизонтальный отступ (px). */
  overlapOffsetPx: number
}


export interface TimeSlot {
  label: string
  topPercent: number
}

export interface BookingFilters {
  day: string
  zone: string | null
}
