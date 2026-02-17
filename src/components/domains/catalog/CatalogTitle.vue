<script setup>
import { filter, product as p, type } from '@/api/api'
import { computed } from 'vue'

const if_filter_filters_length = computed(() => Boolean(Number(filter.filters.length)))
</script>

<template>
  <div class="catalog-title box-x gap as">
    <h2>{{ type.value.visible_name }}</h2>
    <p class="c-sub">
      {{ p.products.pagingInfo?.totalCount }} товаров
      <template v-if="if_filter_filters_length">
        <span class="c-main">/ </span> {{ filter.filters.length }} активных фильтра
        <span class="c-main">/ </span>
        <button @click="filter.resetFilters" class="a">очитстить все фильтры</button>
      </template>
    </p>
  </div>
</template>

<style lang="sass" scoped>
//
</style>
