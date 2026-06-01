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
  const date = new Date(`${isoDate}T12:00:00`)
  return date.toLocaleDateString('ru-RU', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })
}
