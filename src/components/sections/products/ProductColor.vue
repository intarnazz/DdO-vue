<script setup lang="ts">
import { product as api_product } from '@/api/api'
import Product from '@/api/local_domains/catalog/product/product.model'
import { VariantProduct } from '@/api/local_domains/catalog/product/types'
import ProductColor from '@/components/domains/product/ProductColor.vue'
import RouterLinkProduct from '@/layout/router-links/RouterLinkProduct.vue'
import { computed } from 'vue'

const { product } = defineProps<{
  product: VariantProduct
}>()

const parent_is_glass = computed<boolean>(() => api_product.product.inserts[0]?.slug === 'glass')
const is_glass = computed<boolean>(() => product.inserts[0]?.slug === 'glass')
</script>

<template>
  <template v-if="parent_is_glass === is_glass">
    <RouterLinkProduct
      v-if="product.id !== api_product.product.id"
      :product="{
        //[ ]: computed
        ...new Product(product).object,
        variant: api_product.product.variant,
        characteristics: api_product.product.characteristics,
        type: api_product.product.type,
      }"
    >
      <ProductColor :colors="product.colors" :is_active="false" />
    </RouterLinkProduct>
    <ProductColor v-else :colors="product.colors" :is_active="true" />
  </template>
</template>

<style lang="sass" scoped></style>
