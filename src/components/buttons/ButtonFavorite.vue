<script setup lang="ts">
import { product } from '@/api/api'
import IconFavorite from '@/components/icons/IconFavorite.vue'

function set_favorite() {
  product.product.is_favorite = !product.product.is_favorite
}
</script>

<template>
  <button
    @click="set_favorite"
    class="button-favorite box-x gap-2"
    :class="{ checked: product.product.is_favorite }"
  >
    <IconFavorite :active="product.product.is_favorite" />
    <div class="action button-favorite__text h-6">
      <span class="option-1">в избранное</span>
      <span class="option-2">В избранном</span>
    </div>
  </button>
</template>

<style lang="sass" scoped>
.button-favorite
  background-color: white
  display: flex
  align-items: center
  gap: 14px
  padding: 10px 15px 10px 10px
  cursor: pointer
  user-select: none
  border-radius: 10px
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px
  color: black

  &.checked svg
    fill: hsl(0deg 100% 50%)
    stroke: hsl(0deg 100% 50%)
    animation: heartButton 1s

  @keyframes heartButton
    0%
      transform: scale(1)

    25%
      transform: scale(1.3)

    50%
      transform: scale(1)

    75%
      transform: scale(1.3)

    100%
      transform: scale(1)

  .action
    position: relative
    overflow: hidden
    display: grid

    span
      grid-column-start: 1
      grid-column-end: 1
      grid-row-start: 1
      grid-row-end: 1
      transition: all .5s

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

  &__text
    align-items: flex-start
    transition: .3s
</style>
