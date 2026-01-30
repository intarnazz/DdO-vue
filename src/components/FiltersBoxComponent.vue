<script setup>
import { type } from '@/api/api'
import FilterComponent from '@/components/FilterComponent.vue'
</script>

<template>
  <div class="filter__list box-y">
    <FilterComponent :filter="filter" v-for="(filter, key) in type.value.filters" :key="key" />
  </div>
</template>

<style lang="sass" scoped>
//
</style>
