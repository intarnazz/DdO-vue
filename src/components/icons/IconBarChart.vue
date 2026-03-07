<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const props = defineProps<{
  active: boolean
}>()

const active = computed(() => props.active || false)

const _active = ref<boolean | number>(active.value ? 1 : 0)

watch(
  () => active.value,
  (n) => (_active.value = n),
)
</script>

<template>
  <svg
    :class="{
      active: _active == true,
      active_on: _active === true,
      active_off: _active === false,
    }"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M16 20V13H20V20H16ZM10 20V4H14V20H10ZM4 20V9H8V20H4Z" />
  </svg>
</template>

<style lang="sass" scoped>
//
svg
  cursor: pointer
  fill: $main

.active
  fill: $w
  background-color: $mark
  +br

.active_on
  animation: active_on .125s forwards linear

.active_off
  animation: active_off .125s forwards linear

@keyframes active_on
  0%
    margin-bottom: -1rem
  100%
    margin-bottom: 0rem

// @keyframes active_on
//   0%
//     margin-bottom: -1rem
//   100%
//     margin-bottom: 0rem

@keyframes active_off
  0%
    margin-bottom: -1rem
  100%
    margin-bottom: 0rem
</style>
