<script setup lang="ts">
import { product as api_product, type } from '@/api/api'
import { RouterLink } from 'vue-router'
import { DefaultProductType } from '@/api/local_domains/catalog/product/types'

const { product } = defineProps<{
  product: DefaultProductType
}>()

function set_product() {
  api_product.product = product
}
</script>

<template>
  <RouterLink
    @click="set_product"
    :to="{
      name: 'product',
      params: {
        type: api_product.product.type.name || type.type.name,
        model: product.variant.name,
        id: product.id,
        name: product.name.replace(/[^\p{L}\p{N}]+/gu, ''),
      },
    }"
  >
    <slot />
  </RouterLink>
</template>

<style lang="sass" scoped>
//
</style>
