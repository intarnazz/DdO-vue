<script setup lang="ts">
import { filter, product as p, type } from '@/api/api'
import ButtonResetFilters from '@/components/buttons/ButtonResetFilters.vue'
</script>

<template>
  <div class="catalog-title box-x gap as">
    <h2>{{ type.type.visible_name }}</h2>
    <p class="c-sub">
      {{ p.pagingInfo.totalCount }} товаров
      <template v-if="filter.length">
        <span class="c-main">/ </span> {{ filter.filters.length }} активных фильтра
        <span class="c-main">/ </span>
        <ButtonResetFilters />
      </template>
    </p>
  </div>
</template>

<style lang="sass" scoped>
//
</style>
