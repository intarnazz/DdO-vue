<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { filter } from '@/api/api'
import { Filters } from '@/api/local_domains/query/types'
import { computed } from 'vue'

const {
  type_name,
  type_id,
  query: propsQuery,
} = defineProps<{
  type_id: number
  type_name: string
  query?: Filters
}>()

const filter_legacy = computed(() => {
  return { limit: filter.limit, order: filter.order || undefined, desc: filter.desc || undefined }
})

const query = computed(() => {
  if (propsQuery) return { ...filter_legacy.value, ...propsQuery }
  return filter_legacy.value
})
</script>

<template>
  <RouterLink
    v-if="type_name && type_id"
    :to="{
      name: 'catalog',
      params: {
        type: type_name,
        id: type_id,
      },
      query: query,
    }"
  >
    <slot />
  </RouterLink>
</template>

<style scoped lang="sass"></style>
