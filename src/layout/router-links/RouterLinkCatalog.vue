<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Filters } from '@/api/local_domains/query/types'
import { filter } from '@/api/api'

const { type_name, type_id } = defineProps<{
  type_id: number
  type_name: string
  query?: Filters
}>()
</script>

<template>
  <RouterLink
    v-if="type_name"
    :to="{
      name: 'catalog',
      params: {
        type: type_name,
        id: type_id,
      },
      query: { limit: filter.limit },
    }"
  >
    <slot />
  </RouterLink>
</template>

<style scoped lang="sass"></style>
