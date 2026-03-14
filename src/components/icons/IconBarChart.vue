<script setup lang="ts">
import LayoutIcon from '@/layout/LayoutIcon.vue'

const props = defineProps<{
  active: boolean
}>()
</script>

<template>
  <LayoutIcon
    class="relative z-1"
    :active="props.active"
    v-slot="{ active, active_on, active_off }"
  >
    <svg
      class="relative z-2"
      :class="{
        active: active,
        active_on: active_on,
        active_off: active_off,
      }"
      width="24"
      height="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M16 20V13H20V20H16ZM10 20V4H14V20H10ZM4 20V9H8V20H4Z" />
    </svg>
  </LayoutIcon>
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
