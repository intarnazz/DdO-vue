<script setup>
import { type } from '@/api/api'
import ComponentFilters from '@/components/ComponentFilters.vue'
</script>

<template>
  <div v-if="type.value.filters" class="filter__list box-y">
    <ComponentFilters :filter="filter" v-for="(filter, key) in type.value.filters" :key="key" />
  </div>
</template>

<style lang="sass" scoped>
//
</style>
