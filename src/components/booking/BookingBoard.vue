<script setup lang="ts">
import TableColumn from './TableColumn.vue'
import TimeAxis from './TimeAxis.vue'
import type { Restaurant, Table } from '@/types'

defineProps<{
  tables: Table[]
  restaurant: Restaurant
}>()
</script>

<template>
  <section class="booking-board" aria-label="Схема столов">
    <div v-if="tables.length > 0" class="booking-board__scroll">
      <TimeAxis
        :opening-time="restaurant.opening_time"
        :closing-time="restaurant.closing_time"
      />
      <div class="booking-board__columns">
        <TableColumn
          v-for="table in tables"
          :key="table.id"
          :table="table"
          :opening-time="restaurant.opening_time"
          :closing-time="restaurant.closing_time"
          :time-zone="restaurant.timezone"
        />
      </div>
    </div>
    <p v-else class="booking-board__empty">
      Нет столов в выбранной зоне
    </p>
  </section>
</template>

<style scoped>
.booking-board {
  border-radius: 12px;
  overflow: hidden;
}

.booking-board__scroll {
  display: flex;
  overflow-x: auto;
  overflow-y: auto;
  max-height: min(80vh, 900px);
}

.booking-board__columns {
  display: flex;
  flex: 1;
  min-width: min-content;
}

.booking-board__empty {
  margin: 0;
  padding: 2rem;
  text-align: center;
  color: var(--color-muted);
}
</style>
