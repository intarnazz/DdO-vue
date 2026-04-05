<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { filter } from '@/api/api'

const { type_name, type_id } = defineProps<{
  type_id: number
  type_name: string
}>()

// const set_catalog = () => (type.type = { name: type_name, id: type_id })
// TODO: наследование type невозможно из-за отсутствия данных "visible_name"
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
