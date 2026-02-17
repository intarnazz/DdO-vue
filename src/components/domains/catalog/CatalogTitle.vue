<script setup>
import { filter, product as p, type } from '@/api/api'
</script>

<template>
  <div class="catalog-title box-x gap as">
    <h2>{{ type.value.visible_name }}</h2>
    <p class="c-sub">
      {{ p.products.pagingInfo?.totalCount }} товаров
      {{ typeof filter.filters.length }}
      <template v-if="filter.filters.length"> / {{ filter.filters.length }} </template>
    </p>
  </div>
</template>

<style lang="sass" scoped>
//
</style>
