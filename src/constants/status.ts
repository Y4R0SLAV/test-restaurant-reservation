import type { OrderStatus, ReservationStatus } from '@/types'

export interface StatusStyle {
  label: string
  bg: string
  text?: string
  subLabel?: string;
  borderColor?: string;
}

export const ORDER_STATUS: Record<OrderStatus, StatusStyle> = {
  New: { label: 'Новый', bg: '#7FD7CC29', subLabel: 'Новый', borderColor: '#7FD7CC' },
  Bill: { label: 'Счёт', bg: '#7FD7CC29', subLabel: 'Пречек', borderColor: '#7FD7CC' },
  Closed: { label: 'Закрыт', bg: '#7FD7CC29', subLabel: 'Закрытый', borderColor: '#7FD7CC' },
  Banquet: { label: 'Банкет', bg: '#B348F729', borderColor: '#7B439E'},
}

export const RESERVATION_STATUS: Record<ReservationStatus, StatusStyle> = {
  'Живая очередь': { label: 'Живая очередь', bg: '#0097FD29', text: '#be185d', borderColor: '#007AFF' },
  Новая: { label: 'Ожидает подтверждения', bg: '#FF704329', text: '#1d4ed8', borderColor: '#FF7043' },
  Заявка: { label: 'Ожидаем', bg: '#FF704329', text: '#c2410c', borderColor: '#FF7043' },
  Открыт: { label: 'В зале', bg: '#FF704329', text: '#15803d', borderColor: '#FF7043' },
  Закрыт: { label: 'Отменен', bg: '#FF704329', text: '#374151', borderColor: '#FF7043' },
}
