<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps(['fill', 'is_turn', 'default_turn'])

const fill = computed(() => (props.fill ? `fill_${props.fill}` : ''))
const is_turn = computed(() => props.is_turn)
const default_turn = computed(() => props.default_turn)
</script>

<template>
  <svg
    :class="[
      {
        turn_on: is_turn === true,
        turn_off: is_turn === false,
      },
      {
        on: default_turn === true,
        off: default_turn === false,
      },
      fill,
    ]"
    width="12"
    height="8"
    viewBox="0 0 12 8"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M6 2.8L1.4 7.4L0 6L6 0L12 6L10.6 7.4L6 2.8Z" />
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

.off
  transform: rotate(0deg);

.on
  transform: rotate(-180deg);

.turn_on
    animation: turn_on .125s forwards ease-in

.turn_off
  animation: turn_off .125s forwards ease-in

@keyframes turn_on
  0%
    transform: rotate(0deg);
  50%
    opacity: 0%
  100%
    opacity: 100%
    transform: rotate(-180deg);

@keyframes turn_off
  0%
    opacity: 100%
    transform: rotate(180deg);
  50%
    opacity: 0%
  100%
    transform: rotate(0deg);
    opacity: 100%
</style>
