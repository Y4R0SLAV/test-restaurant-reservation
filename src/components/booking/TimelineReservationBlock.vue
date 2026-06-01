<script setup lang="ts">
import StatusBadge from '@/components/ui/StatusBadge.vue'
import { RESERVATION_STATUS } from '@/constants/status'
import type { Reservation } from '@/types'
import { formatTime, parseApiDateTime } from '@/utils/datetime'

const props = defineProps<{
  reservation: Reservation
  topPercent: number
  heightPercent: number
}>()

const style =
  RESERVATION_STATUS[props.reservation.status] ?? {
    label: props.reservation.status,
    bg: '#e5e7eb',
    text: '#374151',
  }
const timeLabel = `${formatTime(parseApiDateTime(props.reservation.seating_time))} — ${formatTime(parseApiDateTime(props.reservation.end_time))}`
</script>

<template>
  <div
    class="timeline-block timeline-block--reservation"
    :style="{
      top: `${topPercent}%`,
      height: `${heightPercent}%`,
      '--block-bg': style.bg,
      '--block-text': style.text,
    }"
    :title="`${reservation.name_for_reservation}, ${reservation.num_people} гостей`"
  >
    <StatusBadge :label="style.label" :bg="style.bg" :text="style.text" />
    <span class="timeline-block__guest">{{ reservation.name_for_reservation }}</span>
    <span class="timeline-block__meta">
      {{ reservation.num_people }} г. · {{ timeLabel }}
    </span>
  </div>
</template>

<style scoped>
.timeline-block {
  position: absolute;
  z-index: 2;
  left: 0.25rem;
  right: 0.25rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 0.125rem;
  padding: 0.375rem 0.5rem;
  border-radius: 6px;
  background: var(--block-bg);
  color: var(--block-text);
  font-size: 0.6875rem;
  overflow: hidden;
  min-height: 2.75rem;
  box-sizing: border-box;
}

.timeline-block__guest {
  font-weight: 600;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
}

.timeline-block__meta {
  opacity: 0.85;
  line-height: 1.2;
}
</style>
