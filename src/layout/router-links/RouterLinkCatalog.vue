<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { filter } from '@/api/api'
import { Filters } from '@/api/local_domains/query/types'

const { type_name, query } = defineProps<{
  type_name: string
  query?: Filters
}>()
</script>

<template>
  <RouterLink
    :to="{
      name: 'catalog',
      params: { type: type_name },
      query: { limit: filter.limit, ...query },
    }"
  >
    <slot />
  </RouterLink>
</template>

<style scoped lang="sass"></style>
