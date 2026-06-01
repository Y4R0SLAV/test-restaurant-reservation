import { computed } from 'vue'
import type { Table } from '@/types'
import type { TimelineEventLayout } from '@/types/ui'
import { layoutTimelineEvents, toTimelineEvents } from '@/utils/timeline'

export function useTableTimeline(
  table: () => Table | null,
  openingTime: () => string,
  closingTime: () => string,
  timeZone: () => string,
) {
  const events = computed(() => {
    const t = table()
    if (!t) return []
    return toTimelineEvents(t.orders, t.reservations)
  })

  const layouts = computed<TimelineEventLayout[]>(() => {
    const t = table()
    if (!t) return []
    return layoutTimelineEvents(
      events.value,
      openingTime(),
      closingTime(),
      timeZone(),
    )
  })

  return { events, layouts }
}
