<script setup lang="ts">
import { cart } from '@/api/api'
import { ProductType } from '@/api/local_domains/catalog/product'
import IconShopping from '@/components/icons/IconShopping.vue'
import LayoutButton from '@/layout/LayoutButton.vue'

const props = defineProps<{
  product: ProductType
}>()

function add_to_cart() {
  cart.add_produc(props.product)
}

// TODO: мини кнопка в каталоге
// TODO: анимация если у же добавлена
// TODO: key на все кнопки
</script>

<template>
  <LayoutButton @click="add_to_cart">
    <IconShopping />
    <strong> в корзину </strong>
  </LayoutButton>
</template>

<style lang="sass" scoped>
//
</style>
