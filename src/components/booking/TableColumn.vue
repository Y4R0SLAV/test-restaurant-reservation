<script setup lang="ts">
import { computed } from 'vue'
import TableTimelineTrack from './TableTimelineTrack.vue'
import type { Table } from '@/types'
import { getTimelineHeightPx } from '@/utils/timeline'

const props = defineProps<{
  table: Table
  openingTime: string
  closingTime: string
  timeZone: string
}>()

const trackHeight = computed(() =>
  getTimelineHeightPx(props.openingTime, props.closingTime),
)
</script>

<template>
  <article class="table-column">
    <header class="table-column__header">
      <div class="table-column__header-top">
        <p class="table-column__header-table">
          <span class="table-column__muted">#</span>
          <span class="table-column__number"> {{ table.number }}</span>
        </p>
        <span class="table-column__muted">{{ table.capacity }} чел</span>
      </div>
      <span class="table-column__muted"> {{table.zone}} </span>
    </header>
    <TableTimelineTrack
      :table="table"
      :opening-time="openingTime"
      :closing-time="closingTime"
      :time-zone="timeZone"
      :style="{ height: `${trackHeight}px` }"
    />
  </article>
</template>

<style scoped>
.table-column {
  flex: 0 0 auto;
  width: 80px;
  min-width: 80px;
}

.table-column__header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 4.5rem;
  padding: 0.5rem;
  text-align: center;
}

.table-column__header-top {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
  padding: 0 9px;
}

.table-column__header-table {
  display: flex;
  align-items: center;
  margin: 0;
}

.table-column__number {
  font-weight: 600;
  font-size: 13px;
}

.table-column__muted {
  font-size: 11px;
  color: var(--color-muted);
}
</style>

