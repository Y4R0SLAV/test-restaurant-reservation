export type OrderStatus = 'New' | 'Bill' | 'Closed' | 'Banquet'

export type ReservationStatus =
  | 'Живая очередь'
  | 'Новая'
  | 'Заявка'
  | 'Открыт'
  | 'Закрыт'

export type Zone = '1 этаж' | '2 этаж' | 'Банкетный зал'

export interface Order {
  id: string
  start_time: string
  end_time: string
  status: OrderStatus
}

export interface Reservation {
  id: number
  name_for_reservation: string
  num_people: number
  phone_number: string
  seating_time: string
  end_time: string
  status: ReservationStatus
}

export interface Restaurant {
  id: number
  restaurant_name: string
  opening_time: string
  closing_time: string
  timezone: string
}

export interface Table {
  id: string
  number: string
  capacity: number
  zone: Zone
  orders: Order[]
  reservations: Reservation[]
}

export interface BookingResponse {
  available_days: string[]
  current_day: string
  restaurant: Restaurant
  tables: Table[]
}
