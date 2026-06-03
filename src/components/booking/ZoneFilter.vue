<script setup lang="ts">
import TabBar from '@/components/ui/TabBar.vue'
import type { Zone } from '@/types'

const selectedZones = defineModel<Zone[]>({ required: true })


defineProps<{
  zones: Zone[]
}>()
</script>

<template>
  <TabBar
    v-model="selectedZones"
    label="Отображаемые зоны"
    :items="zones.map((z) => ({ value: z, label: z }))"
    :multiple="true"
    :min-selected="1"
  />
</template>
