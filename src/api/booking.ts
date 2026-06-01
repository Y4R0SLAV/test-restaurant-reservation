import { apiRequest } from './client'
import type { BookingResponse } from '@/types'

/** GET /api/booking — booking data for the test task */
export function getBooking() {
  return apiRequest<BookingResponse>('/api/booking')
}
