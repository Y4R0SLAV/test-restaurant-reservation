import type { OrderStatus, ReservationStatus } from '@/types'

export interface StatusStyle {
  label: string
  bg: string
  text: string
}

export const ORDER_STATUS: Record<OrderStatus, StatusStyle> = {
  New: { label: 'Новый', bg: '#dbeafe', text: '#1d4ed8' },
  Bill: { label: 'Счёт', bg: '#fef3c7', text: '#b45309' },
  Closed: { label: 'Закрыт', bg: '#e5e7eb', text: '#374151' },
  Banquet: { label: 'Банкет', bg: '#ede9fe', text: '#6d28d9' },
}

export const RESERVATION_STATUS: Record<ReservationStatus, StatusStyle> = {
  'Живая очередь': { label: 'Живая очередь', bg: '#0097FD29', text: '#be185d' },
  Новая: { label: 'Новая', bg: '#dbeafe', text: '#1d4ed8' },
  Заявка: { label: 'Заявка', bg: '#ffedd5', text: '#c2410c' },
  Открыт: { label: 'Открыт', bg: '#dcfce7', text: '#15803d' },
  Закрыт: { label: 'Закрыт', bg: '#e5e7eb', text: '#374151' },
}
