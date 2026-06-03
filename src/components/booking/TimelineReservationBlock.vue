<script setup lang="ts">
import { RESERVATION_STATUS } from '@/constants/status'
import type { Reservation } from '@/types'
import TimelineReservationGuest from './TimelineReservationGuest.vue'
import TimelineEventBlock from './TimelineEventBlock.vue'

const props = defineProps<{
  reservation: Reservation
  topPercent: number
  heightPercent: number
  colIndex: number
  colCount: number
  overlapOffsetPx: number
}>()

const style =
  RESERVATION_STATUS[props.reservation.status] ?? {
    label: props.reservation.status,
    bg: '#e5e7eb',
    text: '#374151',
  }
</script>

<template>
  <TimelineEventBlock
    kind="reservation"
    :event="reservation"
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
    :time="{
      start: reservation.seating_time,
      end: reservation.end_time,
    }"
    :title="`${reservation.name_for_reservation}, ${reservation.num_people} гостей`"
  >
    <template #beforeBadge>
      <TimelineReservationGuest
        :name="reservation.name_for_reservation"
        :num-people="reservation.num_people"
      />
    </template>
    <template #afterBadge>
      <span class="timeline-reservation-block__phone-number">
        <img src="/phone.svg" alt="Номер" width="8" height="8" /> {{ reservation.phone_number }}
      </span>
    </template>
  </TimelineEventBlock>
</template>

<style lang="css" scoped>
.timeline-reservation-block__phone-number {
  text-wrap: nowrap;
}
</style>
