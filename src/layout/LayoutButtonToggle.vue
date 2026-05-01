<script setup lang="ts">
const {
  is_mini = false,
  is_active,
  option_1,
  option_2,
} = defineProps<{
  is_mini?: boolean
  is_active: boolean
  title: string
  option_1: string
  option_2: string
}>()
</script>

<template>
  <button
    class="button-option button_mini box-x gap-2 font-normal relative z-1 min-h-6"
    :class="{ checked: is_active }"
  >
    <slot />
    <div v-if="!is_mini" class="action button-favorite__text">
      <span class="option-1 c-sub">{{ option_1 }}</span>
      <span class="option-2">{{ option_2 }}</span>
    </div>
  </button>
</template>

<style lang="sass" scoped>
.button-option
  .action
    position: relative
    overflow: hidden
    display: grid

    span
      grid-column-start: 1
      grid-column-end: 1
      grid-row-start: 1
      grid-row-end: 1
      transition: all .225s

    .option-1
      transform: translate(0px,0%)
      opacity: 1

  &.checked .action .option-1
    transform: translate(0px,-100%)
    opacity: 0

  .action .option-2
    transform: translate(0px,100%)
    opacity: 0

  &.checked .action .option-2
    transform: translate(0px,0%)
    opacity: 1
</style>
