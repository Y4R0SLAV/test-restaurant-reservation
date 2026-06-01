import type { Order, Reservation } from './booking'

/** Событие на шкале времени стола (заказ или бронь). */
export type TimelineEvent =
  | { kind: 'order'; data: Order }
  | { kind: 'reservation'; data: Reservation }

export interface TimelineEventLayout {
  event: TimelineEvent
  topPercent: number
  heightPercent: number
}

export interface TimeSlot {
  label: string
  topPercent: number
}

export interface BookingFilters {
  day: string
  zone: string | null
}
