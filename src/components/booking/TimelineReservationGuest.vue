<script setup lang="ts">
defineProps<{
  name: string
  numPeople: number
}>()

</script>


<template>
  <span class="timeline-block__guest">
    {{ name }};
    <span class="timeline-block__guest-people">
      {{ numPeople }}<span class="timeline-block__guest-minor">чел.</span>
    </span>
  </span>
</template>

<style scoped>
.timeline-block__guest {
  line-height: 1.2;
}

.timeline-block__guest-people {
  text-wrap: nowrap;
}

.timeline-block__guest-minor {
  font-size: 8px;
  font-weight: 400;
}
</style>

