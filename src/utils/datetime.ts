/** Парсит ISO-время из API в Date (локальная TZ браузера). */
export function parseApiDateTime(iso: string): Date {
  return new Date(iso)
}

/** Календарный день события в формате YYYY-MM-DD (как в available_days). */
export function getApiDateKey(iso: string, timeZone: string): string {
  const date = parseApiDateTime(iso)
  if (Number.isNaN(date.getTime())) {
    return iso.slice(0, 10)
  }

  return new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date)
}

/** Минуты от полуночи для момента времени в заданной TZ. */
export function getClockMinutesInTimeZone(date: Date, timeZone: string): number {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(date)

  const hour = Number(parts.find((p) => p.type === 'hour')?.value ?? 0)
  const minute = Number(parts.find((p) => p.type === 'minute')?.value ?? 0)
  return hour * 60 + minute
}

/** "11:00" → минуты от полуночи. */
export function parseClockTime(clock: string): number {
  const [h, m] = clock.split(':').map(Number)
  return h * 60 + (m ?? 0)
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatDayLabel(isoDate: string): string {
  // Разбираем ISO-дату (YYYY-MM-DD) в локальную временную зону
  const [year, month, day] = isoDate.split('-').map(Number)
  const date = new Date(year, month - 1, day)

  // Сегодняшняя дата в локальной зоне (полночь)
  const today = new Date()
  const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate())

  // Разница в днях
  const diffDays = Math.round((date.getTime() - todayDate.getTime()) / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'сегодня'
  if (diffDays === -1) return 'вчера'
  if (diffDays === 1) return 'завтра'

  // Полное название дня недели
  return date.toLocaleDateString('ru-RU', { weekday: 'long' })
}

export function formatDayNumber(isoDate: string): string {
  const date = new Date(`${isoDate}T12:00:00`)
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
  })
}