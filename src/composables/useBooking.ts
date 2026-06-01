import { computed, onMounted, ref, shallowRef } from 'vue'
import { getBooking } from '@/api'
import type { BookingResponse, Zone } from '@/types'

export function useBooking() {
  const data = shallowRef<BookingResponse | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function load() {
    loading.value = true
    error.value = null
    try {
      data.value = await getBooking()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Не удалось загрузить данные'
      data.value = null
    } finally {
      loading.value = false
    }
  }

  onMounted(load)

  const restaurant = computed(() => data.value?.restaurant ?? null)
  const availableDays = computed(() => data.value?.available_days ?? [])
  const currentDay = computed(() => data.value?.current_day ?? '')
  const tables = computed(() => data.value?.tables ?? [])
  const zones = computed<Zone[]>(() => {
    const set = new Set<Zone>()
    for (const table of tables.value) {
      set.add(table.zone)
    }
    return [...set]
  })

  return {
    data,
    loading,
    error,
    load,
    restaurant,
    availableDays,
    currentDay,
    tables,
    zones,
  }
}
