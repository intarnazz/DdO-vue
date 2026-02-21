<script setup lang="ts">
import { product } from '@/api/api'
</script>

<template>
  <section class="product box-y gap-8">
    <h2>CatalogProduct {{ product.product.id }}</h2>
    <p>
      {{ product.product }}
    </p>
  </section>
</template>

<style lang="sass" scoped>
//
</style>
