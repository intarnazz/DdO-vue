<script setup lang="ts">
import { filter, product as p } from '@/api/api'
import { TypeInterface } from '@/api/local_domains/catalog/type/type'
import ButtonResetFilters from '@/components/buttons/ButtonResetFilters.vue'

const { type } = defineProps<{
  type: TypeInterface
}>()
</script>

<template>
  <div class="catalog-title box-x gap as">
    <div class="box-x">
      <h2>{{ type.visible_name }}</h2>
    </div>
    <p class="c-sub">
      {{ p.pagingInfo.totalCount }} товаров
      <template v-if="Boolean(filter.length)">
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
