<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  fill: string
}>()

const fill = computed(() => (props.fill ? `fill_${props.fill}` : ''))
</script>

<template>
  <svg :class="fill" width="12" height="8" viewBox="0 0 12 8" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 4.5999L10.6 -9.77516e-05L12 1.3999L6 7.3999L0 1.3999L1.4 -9.77516e-05L6 4.5999Z" />
  </svg>
</template>

<style lang="sass" scoped>
//
svg
  fill: $main

.fill
  &_sub
    fill: $sub !important
  &_sub-90
    fill: $sub-90 !important
  &_sub-95
    fill: $sub-95 !important
  &_mark
    fill: $mark !important
  &_red
    fill: $red !important
  &_green
    fill: $green !important
</style>
