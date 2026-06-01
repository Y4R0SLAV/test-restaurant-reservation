<script setup lang="ts">
import type { Restaurant } from '@/types'

defineProps<{
  restaurant: Restaurant
  currentDay: string
}>()
</script>

<template>
  <header class="restaurant-header">
    <div>
      <h1 class="restaurant-header__title">{{ restaurant.restaurant_name }}</h1>
      <p class="restaurant-header__hours">
        {{ restaurant.opening_time }} — {{ restaurant.closing_time }}
        <span class="restaurant-header__tz">{{ restaurant.timezone }}</span>
      </p>
    </div>
    <time class="restaurant-header__day" :datetime="currentDay">
      {{ currentDay }}
    </time>
  </header>
</template>

<style scoped>
.restaurant-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}

.restaurant-header__title {
  margin: 0 0 0.25rem;
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--color-muted);
}

.restaurant-header__hours {
  margin: 0;
  color: var(--color-muted);
  font-size: 0.9375rem;
}

.restaurant-header__tz {
  margin-left: 0.5rem;
  opacity: 0.8;
}

.restaurant-header__day {
  padding: 0.375rem 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  font-size: 0.875rem;
  color: var(--color-text);
}
</style>
