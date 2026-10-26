<script setup lang="ts">
import { product as api_product, type as api_type } from '@/api/api'
import { RouterLink } from 'vue-router'
import { DefaultProductType } from '@/api/local_domains/catalog/product/types'
import { DefaultTypeInterface } from '@/api/local_domains/catalog/type/type'

const { product, type } = defineProps<{
  product: DefaultProductType
  type?: DefaultTypeInterface
}>()

function set_product() {
  api_product.product = product
}
</script>

<template>
  <RouterLink
    v-if="type?.name || api_type.type.name || api_product.product.type.name || product.type.name"
    @click.exact="set_product"
    :to="{
      name: 'product',
      params: {
        type:
          type?.name || api_type.type.name || api_product.product.type.name || product.type.name,
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
