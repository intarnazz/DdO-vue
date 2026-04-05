<script setup lang="ts">
import { ProductType } from '@/api/local_domains/catalog/product'

const { product } = defineProps<{
  product: ProductType
}>()
</script>

<template>
  <div
    v-if="product.has_price_discount"
    class="product-discount absolute z-1 top-2 -left-2 px-2 py-1 bg-mark c-w shadow-xl"
  >
    - {{ product.discount }} %
  </div>
</template>

<style lang="sass" scoped></style>
