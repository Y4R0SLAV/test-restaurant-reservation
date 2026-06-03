<script setup lang="ts">
import { computed } from 'vue'
import TimelineOrderBlock from './TimelineOrderBlock.vue'
import TimelineReservationBlock from './TimelineReservationBlock.vue'
import type { Table } from '@/types'
import { useTableTimeline } from '@/composables/useTableTimeline'
import { buildTimeSlots, DEFAULT_GRID_STEP_MINUTES } from '@/utils/timeline'






const props = defineProps<{
  table: Table
  openingTime: string
  closingTime: string
  timeZone: string
}>()

const { layouts } = useTableTimeline(
  () => props.table,
  () => props.openingTime,
  () => props.closingTime,
  () => props.timeZone,
)



const gridStepMinutes = DEFAULT_GRID_STEP_MINUTES

const minorSlots = computed(() =>
  buildTimeSlots(props.openingTime, props.closingTime, gridStepMinutes),
)

const hourSlots = computed(() =>
  buildTimeSlots(props.openingTime, props.closingTime, 30),
)



</script>



<template>
  <div
    class="table-timeline-track"
  >
    <!-- Слой сетки: горизонтальные линии для временных блоков -->
    <div class="table-timeline-grid" aria-hidden="true">
      <!-- TODO для создания брони и столов -->
      <!-- minor: каждые 15 минут (или DEFAULT_GRID_STEP_MINUTES) -->
      <div
        v-for="slot in minorSlots"
        :key="`minor-${slot.label}`"
        class="table-timeline-grid__minor-line"
        :style="{ top: `${slot.topPercent}%` }"
      />

      <!-- major: каждый час -->
      <div
        v-for="slot in hourSlots"
        :key="`major-${slot.label}`"
        class="table-timeline-grid__major-line"
        :style="{ top: `${slot.topPercent}%` }"
      />
    </div>

    <template
      v-for="layout in layouts"
      :key="`${layout.event.kind}-${layout.event.data.id}`"
    >
      <TimelineOrderBlock
        v-if="layout.event.kind === 'order'"
        :order="layout.event.data"
        :top-percent="layout.topPercent"
        :height-percent="layout.heightPercent"
        :col-index="layout.colIndex"
        :col-count="layout.colCount"
        :overlap-offset-px="layout.overlapOffsetPx"
      />
      <TimelineReservationBlock
        v-else
        :reservation="layout.event.data"
        :top-percent="layout.topPercent"
        :height-percent="layout.heightPercent"
        :col-index="layout.colIndex"
        :col-count="layout.colCount"
        :overlap-offset-px="layout.overlapOffsetPx"
      />

    </template>
  </div>
</template>

<style scoped>
.table-timeline-track {
  position: relative;
  background: var(--color-bg);
  border-right: 1px solid var(--color-border);
}

.table-timeline-grid {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

.table-timeline-grid__major-line {
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--color-border);
  opacity: 0.38;
}

.table-timeline-grid__cell {
  position: absolute;
  left: 0;
  right: 0;
  border-top: 1px dashed rgba(148, 163, 184, 0.35);
  box-sizing: border-box;
  z-index: 0;
  opacity: 0;
}

.table-timeline-grid__cell {
  position: absolute;
  left: 0;
  right: 0;
  border-top: 1px dashed rgba(148, 163, 184, 0.35);
  box-sizing: border-box;
  z-index: 0;
  opacity: 0;
}
</style>

