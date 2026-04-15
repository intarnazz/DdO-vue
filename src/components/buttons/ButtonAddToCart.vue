<script setup lang="ts">
import { cart } from '@/api/api'
import { ProductType } from '@/api/local_domains/catalog/product'
import IconShopping from '@/components/icons/IconShopping.vue'
import LayoutButton from '@/layout/LayoutButton.vue'
import { computed } from 'vue'

const { product, is_mini = false } = defineProps<{
  product: ProductType
  is_mini?: boolean
}>()

const active = computed(() => cart.products.some((p) => p.product.id === product.id))
const strong_text = computed(() => (active.value ? 'уже в корзине' : 'в корзину'))

function add_to_cart() {
  cart.add_produc({
    product: product.object,
    count: 1,
  })
}

function change_cart() {
  if (!active.value) add_to_cart()
  else cart.remove_produc(product)
}
</script>

<template>
  <LayoutButton v-if="!is_mini" @click="add_to_cart" :disabled="active">
    <IconShopping />
    <strong> {{ strong_text }} </strong>
  </LayoutButton>
  <button @click="change_cart" v-if="is_mini" class="button_icon min-h-6">
    <IconShopping :active="active" />
  </button>
</template>

<style lang="sass" scoped></style>
