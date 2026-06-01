<script setup lang="ts">
import { computed } from 'vue'
import BookingBoard from '@/components/booking/BookingBoard.vue'
import DaySelector from '@/components/booking/DaySelector.vue'
import RestaurantHeader from '@/components/booking/RestaurantHeader.vue'
import ZoneFilter from '@/components/booking/ZoneFilter.vue'
import { useBooking } from '@/composables/useBooking'
import { useBookingFilters } from '@/composables/useBookingFilters'

const {
  loading,
  error,
  load,
  restaurant,
  availableDays,
  currentDay,
  tables,
  zones,
} = useBooking()

const { selectedDay, selectedZones, filteredTables } = useBookingFilters(
  () => tables.value,
  () => availableDays.value,
  () => currentDay.value,
  () => zones.value,
  () => restaurant.value?.timezone ?? 'Europe/Moscow',
)

const canRender = computed(
  () => restaurant.value && selectedZones.value.length > 0 && !loading.value && !error.value,
)
</script>

<template>
  <div class="bookings-view">
    <p v-if="loading" class="bookings-view__state">Загрузка…</p>

    <div v-else-if="error" class="bookings-view__state bookings-view__state--error">
      <p>{{ error }}</p>
      <button type="button" class="bookings-view__retry" @click="load">
        Повторить
      </button>
    </div>

    <template v-else-if="canRender && restaurant">
      <RestaurantHeader :restaurant="restaurant" :currentDay="selectedDay[0] ?? ''" />

      <div class="bookings-view__filters">
        <DaySelector v-model="selectedDay" :days="availableDays" />
        <ZoneFilter v-model="selectedZones" :zones="zones" />
      </div>

      <BookingBoard :tables="filteredTables" :restaurant="restaurant" />
    </template>
  </div>
</template>

<style scoped>
.bookings-view {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 100%;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.bookings-view__filters {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.bookings-view__state {
  margin: 0;
  padding: 3rem;
  text-align: center;
  color: var(--color-muted);
}

.bookings-view__state--error {
  color: #b91c1c;
}

.bookings-view__retry {
  margin-top: 0.75rem;
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  cursor: pointer;
}

.bookings-view__retry:hover {
  border-color: var(--color-accent);
}
</style>

