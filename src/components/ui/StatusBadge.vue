<script setup lang="ts">
defineProps<{
  label: string
  bg?: string
  text?: string
}>()
</script>

<template>
  <span
    class="status-badge"
    :style="{ backgroundColor: bg || 'transparent', color: text || 'white' }"
  >
    {{ label }}
  </span>
</template>

<style scoped>
.status-badge {
  display: inline-block;
  flex: 0 0 auto;
  max-width: 100%;

  width: max-content;
  min-width: max-content;

  padding: 2px;
  border-radius: 4px;
  font-size: 8px;
  font-weight: 600;
  line-height: 1.25;

  /* чтобы badge не пропадал при нехватке места */
  white-space: nowrap;
  overflow: visible;
  text-overflow: clip;

  /* на случай, если родитель использует flex/overflow */
  position: relative;
  z-index: 10;
}
</style>
