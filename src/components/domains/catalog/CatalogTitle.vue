<script setup lang="ts">
import { TypeInterface } from '@/api/local_domains/catalog/type/type'
import { Query } from '@/api/local_domains/query'
import { PagingInfo } from '@/api/web_services/rest'
import ButtonResetFilters from '@/components/buttons/ButtonResetFilters.vue'

const { type, pagingInfo } = defineProps<{
  type: TypeInterface
  pagingInfo: PagingInfo
  filter?: Query
}>()
</script>

<template>
  <div class="catalog-title box-x gap as">
    <div class="box-x">
      <h2>{{ type.visible_name }}</h2>
    </div>
    <p class="c-sub">
      {{ pagingInfo.totalCount }} товаров
      <template v-if="filter && Boolean(filter.length)">
        <span class="c-main">/ </span> {{ filter.length }} активных фильтра
        <span class="c-main">/ </span>
        <ButtonResetFilters />
      </template>
    </p>
  </div>
</template>

<style lang="sass" scoped>
//
</style>
