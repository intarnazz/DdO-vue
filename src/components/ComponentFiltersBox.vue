<script setup>
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
  if (!type.value.filters) return []
  return [type.value.filters[0], filter_range_prace.value, ...type.value.filters.slice(1)]
})
</script>

<template>
  <div v-if="type.value.filters" class="filter__list box-y">
    <ComponentFilters :filter="filter" v-for="(filter, key) in filtersWithPrice" :key="key" />
  </div>
</template>

<style lang="sass" scoped>
//
</style>
