<script setup lang="ts">
import { ProductType } from '@/api/local_domains/catalog/product'
import IconBarChart from '@/components/icons/IconBarChart.vue'

const { is_mini, active, product } = defineProps<{
  is_mini: boolean
  active: boolean
  product: ProductType
}>()
</script>

<template>
  <span
    :key="product.id"
    class="comparison-action button_mini box-x gap-2 font-normal relative z-1 min-h-6"
  >
    <IconBarChart class="relative z-2" :active="active" />
    <span
      v-if="!is_mini"
      :class="{
        'c-sub': !active,
      }"
      >сравнить</span
    >
  </span>
</template>

<style lang="sass" scoped></style>
