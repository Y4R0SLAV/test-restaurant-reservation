<script setup lang="ts">
import TabBar from '@/components/ui/TabBar.vue'
import { formatDayLabel, formatDayNumber } from '@/utils/datetime'

const selectedDay = defineModel<string[]>({ required: true })

defineProps<{ days: string[] }>()

</script>

<template>
  <TabBar
    v-model="selectedDay"
    label="Дата"
    :items="days.map((d) => ({ value: d, label: formatDayLabel(d), day: formatDayNumber(d) }))"
  />
</template>
