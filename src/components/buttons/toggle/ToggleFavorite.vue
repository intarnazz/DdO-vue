<script setup lang="ts">
import { ProductType } from '@/api/local_domains/catalog/product'
import IconFavorite from '@/components/icons/IconFavorite.vue'
import LayoutButtonToggle from '@/layout/LayoutButtonToggle.vue'
import { computed } from 'vue'

const props = defineProps<{
  product: ProductType
  is_mini?: boolean
}>()

const product = computed(() => props.product)
const is_mini = computed(() => props.is_mini || false)

function set_favorite() {
  product.value.is_favorite = !product.value.is_favorite
}
</script>

<template>
  <LayoutButtonToggle
    title="Добавить продукт в избранное"
    @click="set_favorite"
    :is_active="product.is_favorite"
    :is_mini="is_mini"
    :option_1="`в избранное`"
    :option_2="`в избранном`"
    :key="product.id"
  >
    <IconFavorite class="relative z-2" :active="product.is_favorite" />
  </LayoutButtonToggle>
</template>
