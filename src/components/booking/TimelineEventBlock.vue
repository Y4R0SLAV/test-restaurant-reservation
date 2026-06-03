<script setup lang="ts">
import StatusBadge from '@/components/ui/StatusBadge.vue'
import type { Order, Reservation } from '@/types'
import { formatTime, parseApiDateTime } from '@/utils/datetime'

type TimelineEventKind = 'order' | 'reservation'

type Props = {
  kind: TimelineEventKind
  event: Order | Reservation
  topPercent: number
  heightPercent: number
  colIndex: number
  colCount: number
  overlapOffsetPx: number
  zIndex?: number
  title?: string
  badge: {
    label: string
    bg: string
    text?: string
    borderColor?: string
  }
  time: {
    start: string
    end: string
  }
}

const props = defineProps<Props>()

const timeLabel = `${formatTime(parseApiDateTime(props.time.start))} - ${formatTime(
  parseApiDateTime(props.time.end),
)}`
</script>

<template>
  <div
    class="timeline-block"
    :class="`timeline-block--${kind}`"
    :style="{
      top: `${topPercent}%`,
      height: `${heightPercent}%`,
      '--block-bg': badge.bg,
      '--block-text': badge.text,
      '--block-border': badge.borderColor,
      'left': `calc(${(colIndex * 100) / colCount}% + ${overlapOffsetPx}px)`,
      'width': `calc((100% - ${overlapOffsetPx}px) / ${colCount}`,
    }"
    :title="title ?? timeLabel"
  >
    <slot name="beforeBadge" />

    <StatusBadge :label="badge.label" :bg="badge.bg" />

    <slot name="afterBadge" />

    <span class="timeline-block__meta">
      <slot name="time" :time-label="timeLabel">
        {{ timeLabel }}
      </slot>
    </span>
  </div>
</template>

<style scoped>
.timeline-block {
  position: absolute;
  overflow: visible;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 2px 2px 2px 8px;
  overflow: hidden;
  box-sizing: border-box;

  border-radius: 6px;
  background: var(--block-bg);
  font-weight: 600;

  --col-gap: 2px;
}

.timeline-block::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--block-border);
}

.timeline-block__meta {
  line-height: 1.2;
  opacity: 0.85;
}

.timeline-block--order {
  z-index: 1;
  font-size: 0.6875rem;
  padding-left: 9px;
}

.timeline-block--reservation {
  z-index: 2;
  font-size: 11px;
}
</style>

