<script setup lang="ts">
import { product as api_product } from '@/api/api'
import { ProductType } from '@/api/local_domains/catalog/product'
import ComparisonMain from '@/components/buttons/comparisons/ComparisonMain.vue'
import RouterLinkCatalog from '@/layout/router-links/RouterLinkCatalog.vue'
import { computed } from 'vue'

const { product, is_mini = false } = defineProps<{
  product: ProductType
  is_mini?: boolean
}>()

const comparison_product_id = computed<number>(() => {
  if (api_product.comparison_product === null) return NaN
  return api_product.comparison_product.id
})

const active = computed(() => comparison_product_id.value === product.id)

function set_comparison_product() {
  if (api_product.comparison_product === null || api_product.comparison_product.id !== product.id)
    api_product.comparison_product = product
  else api_product.comparison_product = null
}
</script>

<template>
  <RouterLinkCatalog
    v-if="!active"
    :type_name="api_product.product.type.name"
    title="Сравнить с другими продуктами"
    @click="set_comparison_product"
  >
    <ComparisonMain :product="product" :active="active" :is_mini="is_mini" />
  </RouterLinkCatalog>

  <button v-else title="Сравнить с другими продуктами" @click="set_comparison_product">
    <ComparisonMain :product="product" :active="active" :is_mini="is_mini" />
  </button>
</template>

<style lang="sass" scoped></style>
