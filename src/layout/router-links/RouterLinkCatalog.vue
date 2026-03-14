<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { filter, type } from '@/api/api'

const props = defineProps<{
  type_name: typeof type.type.name
}>()
</script>

<template>
  <RouterLink
    class="c-sub a a_sub"
    :to="{
      name: 'catalog',
      params: { type: type_name },
      query: filter.query,
    }"
  >
    <slot />
  </RouterLink>
</template>

<style scoped lang="sass"></style>
