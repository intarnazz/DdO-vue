<script setup lang="ts">
import { user } from '@/api/api'
import IconPottedPlant from '@/components/icons/IconPottedPlant.vue'
import interior_is_valid from '@/components/sections/products/interior_is_valid.use'
import { useToggle } from '@vueuse/core'

const product_interior_toggle = useToggle(user.interior_is_active)
</script>

<template>
  <button
    v-if="interior_is_valid"
    title="Включить отображение интерьера"
    @click="product_interior_toggle()"
    class="button-favorite button_mini box-x gap-2 font-normal relative z-1 min-h-6"
    :class="{ checked: user.interior_is_active.value }"
  >
    <IconPottedPlant class="relative z-2" :active="user.interior_is_active.value" />
    <div class="action button-favorite__text">
      <span class="option-1 c-sub">показать интерьер</span>
      <span class="option-2">скрыть интерьер</span>
    </div>
  </button>
</template>

<style lang="sass" scoped>
.button-favorite
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
