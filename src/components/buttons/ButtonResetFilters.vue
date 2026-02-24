<script setup>
import { filter } from '@/api/api'
import IconClearAll from '../icons/IconClearAll.vue'
</script>

<template>
  <button @click="filter.resetFilters" class="a font-normal box-x gap-2">
    <IconClearAll />
    <span> очитстить все фильтры </span>
  </button>
</template>

<style lang="sass" scoped>
//
</style>
