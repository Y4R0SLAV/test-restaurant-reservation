import { computed, ref, watch } from 'vue'
import type { Table, Zone } from '@/types'
import { getApiDateKey } from '@/utils/datetime'

function filterTableEventsByDay(
  table: Table,
  day: string,
  timeZone: string,
): Table {
  return {
    ...table,
    orders: table.orders.filter(
      (o) => getApiDateKey(o.start_time, timeZone) === day,
    ),
    reservations: table.reservations.filter(
      (r) => getApiDateKey(r.seating_time, timeZone) === day,
    ),
  }
}

export function useBookingFilters(
  tables: () => Table[],
  availableDays: () => string[],
  currentDay: () => string,
  zones: () => Zone[],
  timeZone: () => string,
) {
  const selectedDay = ref<string[]>([])
  const selectedZones = ref<Zone[]>([])


  watch(
    () => [availableDays(), currentDay()] as const,
    ([days, day]) => {
      selectedDay.value = days.includes(day) ? [day] : [days[0] ?? '']

    },
    { immediate: true },
  )

  watch(
    zones,
    (list) => {
      // выбранные зоны — массив
      // если нет активных (или список пуст), по стандарту берём первую зону
    if (list.length === 0) {
      selectedZones.value = []
      return
    }

    if (selectedZones.value.length === 0) {
      selectedZones.value = [list[0]]
      return
    }


      // выбросить зоны, которых больше нет в списке
      selectedZones.value = selectedZones.value.filter((z) => list.includes(z))

      // если после фильтрации ничего не осталось — снова первая зона
      if (selectedZones.value.length === 0) {
        selectedZones.value = [list[0]]
      }
    },
    { immediate: true },
  )

  const filteredTables = computed(() => {
    const day = selectedDay.value[0] ?? ''

    const zones = selectedZones.value



    const tz = timeZone()
    let list = day
      ? tables().map((t) => filterTableEventsByDay(t, day, tz))
      : tables()
    if (!zones.length) return list
    return list.filter((t) => zones.includes(t.zone))

  })

  return {
    selectedDay,
    selectedZones,
    filteredTables,
  }
}

