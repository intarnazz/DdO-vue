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

const query = computed(() => {
  if (propsQuery) return { limit: filter.limit, ...propsQuery }
  return { limit: filter.limit }
})

// const set_catalog = () => (type.type = { name: type_name, id: type_id })
// TODO: наследование type невозможно из-за отсутствия данных "visible_name"
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
