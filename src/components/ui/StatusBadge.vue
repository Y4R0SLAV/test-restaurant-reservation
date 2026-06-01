<script setup lang="ts">
defineProps<{
  label: string
  bg: string
  text: string
}>()
</script>

<template>
  <span
    class="status-badge"
    :style="{ backgroundColor: bg, color: text }"
  >
    {{ label }}
  </span>
</template>

<style scoped>
.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.125rem 0.5rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1.25;
  white-space: nowrap;
}
</style>
