<script setup lang="ts">
import ProductService from '@/api/local_domains/catalog/product/product.service'
import ButtonComparison from '@/components/buttons/ButtonComparison.vue'
import ButtonFavorite from '@/components/buttons/ButtonFavorite.vue'
import ButtonInterior from '@/components/buttons/ButtonInterior.vue'

const { product } = defineProps<{
  product: ProductService
}>()
</script>

<template>
  <div class="product__title flex flex-col gap-8">
    <div class="box-y">
      <h2>{{ product.product.name }}</h2>
      <p class="c-sub">{{ product.product.article }}</p>
    </div>
    <div class="product__button-wrapper box-x js gap-8">
      <ButtonFavorite :product="product.product" />
      <ButtonInterior />
      <ButtonComparison :product="product.product" />
    </div>
  </div>
</template>
