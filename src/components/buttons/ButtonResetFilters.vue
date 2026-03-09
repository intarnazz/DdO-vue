<script setup lang="ts">
import { filter } from '@/api/api'
import IconClearAll from '../icons/IconClearAll.vue'
</script>

<template>
  <button
    v-if="filter.filters.length > 0"
    @click="filter.resetFilters"
    class="a font-normal box-x gap-2"
  >
    <IconClearAll />
    <span> очитстить все фильтры </span>
  </button>
</template>

<style lang="sass" scoped>
//
</style>
