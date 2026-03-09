<script setup lang="ts">
import { product as p } from '@/api/api'
import { ProductType } from '@/api/local_domains/catalog/product'
import IconBarChart from '@/components/icons/IconBarChart.vue'
import { computed } from 'vue'

const props = defineProps<{
  product: ProductType
  is_mini?: boolean
}>()

const product = computed(() => props.product)
const is_mini = computed(() => props.is_mini || false)

const comparison_product_id = computed<number>(() => {
  if (p.comparison_product === null) return NaN
  return p.comparison_product.id
})

const active = computed(() => comparison_product_id.value === product.value.id)

function set_comparison_product() {
  if (p.comparison_product === null || p.comparison_product.id !== product.value.id)
    p.comparison_product = product.value
  else p.comparison_product = null
}
</script>

<template>
  <button
    title="Сравнить с другими продуктами"
    @click="set_comparison_product"
    class="button-favorite box-x gap-2 font-normal relative z-1 min-h-6"
  >
    <IconBarChart class="relative z-2" :active="active" />
    <span
      v-if="!is_mini"
      :class="{
        'c-sub': !active,
      }"
      >сравнить</span
    >
  </button>
</template>

<style lang="sass" scoped>
.button-favorite
  &:hover
    background-color: $sub-95
    outline: .5rem solid $sub-95
    border-radius: 5px
</style>
