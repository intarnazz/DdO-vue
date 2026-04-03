<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { filter } from '@/api/api'
import { Filters } from '@/api/local_domains/query/types'
import { computed } from 'vue'

const { type_name, query: propsQuery } = defineProps<{
  type_name: string
  query?: Filters
}>()

const query = computed(() => {
  if (propsQuery) return { limit: filter.limit, ...propsQuery }
  return filter.query
})
</script>

<template>
  <RouterLink
  v-if="type_name"
    :to="{
      name: 'catalog',
      params: { type: type_name },
      query: query,
    }"
  >
    <slot />
  </RouterLink>
</template>

<style scoped lang="sass"></style>
