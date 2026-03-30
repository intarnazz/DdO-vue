<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  text: string
  search: string
}>()

const parts = computed(() => {
  if (!props.search.trim()) return [{ text: props.text, match: false }]
  const escaped = props.search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(${escaped})`, 'gi')
  return props.text.split(regex).map((part, i) => ({
    text: part,
    match: i % 2 === 1,
  }))
})

// TODO: скрыть лишний текст как "..."
</script>

<template>
  <span v-for="(part, i) in parts" :key="i" :class="{ catalog__highlight: part.match }">{{
    part.text
  }}</span>
</template>

<style lang="sass" scoped>
//
.catalog
  &__highlight
    background-color: #ff0
</style>
