<script setup lang="ts">
import { product } from '@/api/api'
import Product from '@/api/local_domains/catalog/product/product.model'
import CatalogItem from '@/components/domains/catalog/CatalogItem.vue'
import { computed } from 'vue'

const products = computed(
  () =>
    product.product.variant.products &&
    product.product.variant.products.filter((p) => p.id !== product.product.id),
)
</script>

<template>
  <section v-if="products && products.length > 0" class="box-y gap-8">
    <h2>похожие товары</h2>
    <div class="product__list gap-12">
      <template v-for="p in products" :key="p.id">
        <CatalogItem v-if="p.id !== product.product.id" :product="new Product(p)" />
      </template>
    </div>
  </section>
</template>

<style lang="sass" scoped>
//
.product
  &__list
    display: grid
    grid-template-columns: repeat( auto-fill, minmax(16rem, 1fr) )
</style>
