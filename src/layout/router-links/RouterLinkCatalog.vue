<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { filter } from '@/api/api'

const { type_name } = defineProps<{
  type_name: string
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
