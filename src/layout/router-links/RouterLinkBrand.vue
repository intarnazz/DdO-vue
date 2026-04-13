<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Brand } from '@/api/api_domains/brand/brand'

const { brand } = defineProps<{
  brand: Brand
}>()
</script>

<template>
  <RouterLink
    :to="{
      name: 'brand',
      params: {
        id: brand.id,
        name: brand.name.replace(/[^\p{L}\p{N}]+/gu, ''),
      },
    }"
  >
    <slot />
  </RouterLink>
</template>

<style lang="sass" scoped>
//
</style>
