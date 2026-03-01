<script setup lang="ts">
import { product as p } from '@/api/api'
import IconFavorite from '@/components/icons/IconFavorite.vue'
import { computed } from 'vue'

const props = defineProps<{
  product: typeof p.product
  is_mini?: boolean
}>()

const product = computed(() => props.product)
const is_mini = computed(() => props.is_mini || false)

function set_favorite() {
  product.value.is_favorite = !product.value.is_favorite
}
</script>

<template>
  <button
    title="Добавить продукт в избранное"
    @click="set_favorite"
    class="button-favorite box-x gap-2 font-normal relative z-1 min-h-6"
    :class="{ checked: product.is_favorite }"
  >
    <IconFavorite class="relative z-2" :active="product.is_favorite" />
    <div v-if="!is_mini" class="action button-favorite__text">
      <span class="option-1">в избранное</span>
      <span class="option-2">В избранном</span>
    </div>
  </button>
</template>

<style lang="sass" scoped>
.button-favorite
  &:hover
    background-color: $sub-95
    outline: .5rem solid $sub-95
    border-radius: 5px
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
