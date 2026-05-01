<script setup lang="ts">
import ProductService from '@/api/local_domains/catalog/product/product.service'
import ButtonComparison from '@/components/buttons/ButtonComparison.vue'
import ToggleFavorite from '@/components/buttons/toggle/ToggleFavorite.vue'
import ToggleInterior from '@/components/buttons/toggle/ToggleInterior.vue'

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
    <div class="product__button-wrapper flex flex-wrap gap-8">
      <ToggleFavorite :product="product.product" />
      <ToggleInterior />
      <ButtonComparison :product="product.product" />
    </div>
  </div>
</template>
