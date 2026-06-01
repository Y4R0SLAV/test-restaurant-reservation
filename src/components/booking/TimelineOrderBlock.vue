<script setup lang="ts">
import StatusBadge from '@/components/ui/StatusBadge.vue'
import { ORDER_STATUS } from '@/constants/status'
import type { Order } from '@/types'
import { formatTime, parseApiDateTime } from '@/utils/datetime'

const props = defineProps<{
  order: Order
  topPercent: number
  heightPercent: number
}>()

const style = ORDER_STATUS[props.order.status]
const timeLabel = `${formatTime(parseApiDateTime(props.order.start_time))} — ${formatTime(parseApiDateTime(props.order.end_time))}`
</script>

<template>
  <div
    class="timeline-block timeline-block--order"
    :style="{
      top: `${topPercent}%`,
      height: `${heightPercent}%`,
      '--block-bg': style.bg,
      '--block-text': style.text,
    }"
    :title="timeLabel"
  >
    <StatusBadge :label="style.label" :bg="style.bg" :text="style.text" />
    <span class="timeline-block__time">{{ timeLabel }}</span>
  </div>
</template>

<style scoped>
.timeline-block {
  position: absolute;
  z-index: 1;
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
  min-height: 2.5rem;
  box-sizing: border-box;
}

.timeline-block__time {
  opacity: 0.85;
  line-height: 1.2;
}
</style>
