<script setup lang="ts">
import { computed } from 'vue'
import { buildTimeSlots, getTimelineHeightPx } from '@/utils/timeline'

const props = defineProps<{
  openingTime: string
  closingTime: string
}>()

const slots = computed(() =>
  buildTimeSlots(props.openingTime, props.closingTime),
)

const trackHeight = computed(() =>
  getTimelineHeightPx(props.openingTime, props.closingTime),
)
</script>

<template>
  <div class="time-axis">
    <div class="time-axis__header" aria-hidden="true" />
    <div
      class="time-axis__track"
      :style="{ height: `${trackHeight}px` }"
    >
      <span
        v-for="slot in slots"
        :key="slot.label"
        class="time-axis__label"
        :style="{ top: `${slot.topPercent}%` }"
      >
        {{ slot.label }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.time-axis {
  flex-shrink: 0;
  width: 3.5rem;
}

.time-axis__header {
  height: 4.5rem;
}

.time-axis__track {
  position: relative;
}

.time-axis__label {
  position: absolute;
  right: 0.5rem;
  font-size: 11px;
  color: var(--color-muted);
  white-space: nowrap;
}
</style>
