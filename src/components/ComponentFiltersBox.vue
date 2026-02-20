<script setup lang="ts">
import { type } from '@/api/api'
import ComponentFilters from '@/components/ComponentFilters.vue'
import { ref, computed } from 'vue'

const filter_range_prace = ref({
  name: 'цена',
  description: 'фильтр по диапозону цен',
  type: 'price',
  content: [],
})

const filtersWithPrice = computed(() => {
  if (!type.type.filters) return []
  return [type.type.filters[0], filter_range_prace.value, ...type.type.filters.slice(1)]
})
</script>

<template>
  <div v-if="type.type.filters" class="filter__list box-y">
    <ComponentFilters :filter="filter" v-for="(filter, key) in filtersWithPrice" :key="key" />
  </div>
</template>

<style lang="sass" scoped>
//
</style>
