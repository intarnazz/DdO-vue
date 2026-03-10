<script setup lang="ts">
import { computed } from 'vue'
import { product as api_product, type } from '@/api/api'
import { RouterLink } from 'vue-router'
import { ProductType } from '@/api/local_domains/catalog/product'

const props = defineProps<{
  product: ProductType
}>()

const product = computed(() => props.product)

function set_product() {
  api_product.product = product.value
}
</script>

<template>
  <RouterLink
    @click="set_product"
    :to="{
      name: 'product',
      params: {
        type: type.type.name,
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
