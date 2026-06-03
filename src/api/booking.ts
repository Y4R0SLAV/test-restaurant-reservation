import type { BookingResponse } from '@/types'

// Хардкодим данные локально: без хоста/сервера, только статический JSON.
// Vite умеет импортировать JSON как модуль.
import bookingJson from '../../server/data/booking.json'

const booking = bookingJson as BookingResponse

/** Локальное получение данных booking.json */
export async function getBooking(): Promise<BookingResponse> {
  return booking
}

