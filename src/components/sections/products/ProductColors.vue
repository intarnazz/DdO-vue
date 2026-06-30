<script setup lang="ts">
import { product } from '@/api/api'
import Product from '@/api/local_domains/catalog/product/product.model'
import ProductColor from '@/components/sections/products/ProductColor.vue'
import RouterLinkProduct from '@/layout/router-links/RouterLinkProduct.vue'
import { computed } from 'vue'

const product_swap = computed(() =>
  product.product.variant.products?.find((p) => {
    const color = p.colors[0]
    const insert = p.inserts[0]
    if (!color) return
    if (!insert) return

    if (
      color.name === product.product.colors[0]?.name &&
      insert.name !== product.product.inserts[0]?.name
    )
      return true
  }),
)
</script>

<template>
  <div
    v-if="
      product.product.colors.length > 0 &&
      product.product.variant.products &&
      product.product.variant.products.length > 0
    "
    class="product__color box-y gap-4"
  >
    <h3>цвет</h3>
    <div class="product__color-list box-x js gap-4 flex-wrap">
      <ProductColor v-for="p in product.product.variant.products" :key="p.id" :product="p" />
    </div>

    <div v-if="product_swap" class="box-x gap-8 js h3">
      <RouterLinkProduct
        class="c-sub"
        v-if="product_swap.inserts[0]?.slug === 'glass'"
        :product="{
          //[ ]: computed
          ...new Product(product_swap).object,
          variant: product.product.variant,
          characteristics: product.product.characteristics,
          type: product.product.type,
        }"
      >
        стекло
      </RouterLinkProduct>

      <p v-else class="a">стекло</p>

      <RouterLinkProduct
        class="c-sub"
        v-if="product_swap.inserts[0]?.slug !== 'glass'"
        :product="{
          //[ ]: computed
          ...new Product(product_swap).object,
          variant: product.product.variant,
          characteristics: product.product.characteristics,
          type: product.product.type,
        }"
      >
        вставка
      </RouterLinkProduct>
      <p v-else class="a">вставка</p>
    </div>
  </div>
</template>

<style lang="sass" scoped>
a
  &:hover
    color: $mark
</style>
