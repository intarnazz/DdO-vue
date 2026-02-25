<script setup lang="ts">
import { product } from '@/api/api'
import IconFavorite from '@/components/icons/IconFavorite.vue'

const props = defineProps<{
  product: typeof product.product
}>()

function set_favorite() {
  product.product.is_favorite = !product.product.is_favorite
}
</script>

<template>
  <button @click="set_favorite" class="box-x gap-2">
    <IconFavorite />
    <span> в избранное </span>
  </button>
</template>

<style lang="sass" scoped>
//
</style>
