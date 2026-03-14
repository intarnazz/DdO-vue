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

const active = computed(() => cart.products.some((p) => p.id === product.id))

function add_to_cart() {
  cart.add_produc(product)
}

function change_cart() {
  if (!active.value) add_to_cart()
  else cart.remove_produc(product)
}

// TODO: анимация если уже добавлена
// TODO: key на все кнопки
</script>

<template>
  <LayoutButton v-if="!is_mini" @click="add_to_cart">
    <IconShopping />
    <strong> в корзину </strong>
  </LayoutButton>
  <button @click="change_cart" v-if="is_mini" class="button_icon min-h-6">
    <IconShopping :active="active" />
  </button>
</template>

<style lang="sass" scoped></style>
