<script setup lang="ts">
import { ORDER_STATUS } from '@/constants/status'
import type { Order } from '@/types'
import TimelineEventBlock from './TimelineEventBlock.vue'

const props = defineProps<{
  order: Order
  topPercent: number
  heightPercent: number
  colIndex: number
  colCount: number
  overlapOffsetPx: number
}>()

const style = ORDER_STATUS[props.order.status]
</script>

<template>
  <TimelineEventBlock
    kind="order"
    :event="order"
    :top-percent="topPercent"
    :height-percent="heightPercent"
    :col-index="colIndex"
    :col-count="colCount"
    :overlap-offset-px="overlapOffsetPx"
    :badge="{
      label: style.label,
      bg: style.bg,
      text: style.text,
      borderColor: style.borderColor,
    }"
    :time="{ start: order.start_time, end: order.end_time }"
  />
</template>

