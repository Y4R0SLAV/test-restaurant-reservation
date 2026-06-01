<script setup lang="ts" generic="T extends string">
const model = defineModel<T[]>({
  required: true,
  default: () => []
})

const props = defineProps<{
  items: { value: T; label: string }[];
  label?: string;
  multiple?: boolean;
}>()

const isActive = (value: T): boolean => {
  return model.value.includes(value)
}

const toggle = (value: T) => {
  if (props.multiple) {
    const current = model.value
    model.value = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value]
  } else {
    // single mode — всегда один элемент
    model.value = [value]
  }
}
</script>

<template>
  <div class="tab-bar">
    <p v-if="label" class="tab-bar__label"> {{ label }} </p>
    <div class="tab-bar__list" role="tablist">
      <button
        v-for="item in items"
        :key="item.value"
        type="button"
        role="tab"
        class="tab-bar__tab"
        :class="{ 'tab-bar__tab--active': isActive(item.value)}"
        :aria-selected="isActive(item.value)"
        @click="toggle(item.value)"
      >
        {{ item.label }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.tab-bar {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.tab-bar__label {
  margin: 0;
  font-size: .875rem;
}

.tab-bar__list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tab-bar__tab {
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-tab);
  border-radius: 8px;
  background-color: var(--color-tab);
  color: var(--color-muted);
  font-size: .875rem;
  cursor: pointer;
  transition:
    background .3s,
    color .3s,
    border-color .3s;
}

.tab-bar__tab:hover {
  border-color: var(--color-accent);
}

.tab-bar__tab--active {
  background-color: var(--color-accent);
  border-color: var(--color-accent);
  font-weight: 500;
  color: var(--color-text);
}
</style>
