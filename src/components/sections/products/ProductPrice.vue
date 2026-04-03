<script setup lang="ts">
import { price as price_utilte } from '@/utilte/utilte'
import { computed } from 'vue'

const { price } = defineProps<{
  price: number
}>()

const product_price = computed(() => price_utilte(price))
</script>

<template>
  <strong class="product-price font-normal">
    {{ product_price }}
    <!-- 
                 [ ]  Полная секция продукта // Выбор между разными price
                -->
  </strong>
</template>

<style lang="sass" scoped>
//
.product-price
  font-size: 2rem
</style>
