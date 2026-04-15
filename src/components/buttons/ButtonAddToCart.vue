<script setup lang="ts">
import { cart } from '@/api/api'
import { ProductType } from '@/api/local_domains/catalog/product'
import IconShopping from '@/components/icons/IconShopping.vue'
import LayoutButton from '@/layout/LayoutButton.vue'
import { computed } from 'vue'

const {
  product,
  price,
  is_mini = false,
} = defineProps<{
  product: ProductType
  price: number
  is_mini?: boolean
}>()

const cart_product = computed(() => cart.get_product(product.id))
const active = computed(() => cart.products.some((p) => p.product.id === product.id))
const strong_text = computed(() => (active.value ? 'Добавить +1' : 'в корзину'))

const add_to_cart = () => {
  if (!active.value)
    return cart.add_produc({
      product: product.object,
      price: price,
    })
  const cart_product = cart.get_product(product.id)
  if (!cart_product) return
  cart_product.count++
}

const change_cart = () => {
  if (!active.value) add_to_cart()
  else cart.remove_produc(product)
}
</script>

<template>
  <LayoutButton class="relative" v-if="!is_mini" @click="add_to_cart">
    <p
      v-if="cart_product && cart_product.count > 0"
      class="absolute -top-2 -left-2 bg-main rounded-full w-9 h-9 center shadow-xl box-x"
    >
      {{ cart_product?.count }}
    </p>
    <IconShopping />
    <strong> {{ strong_text }} </strong>
  </LayoutButton>
  <button @click="change_cart" v-else-if="is_mini" class="button_icon min-h-6">
    <IconShopping :active="active" />
  </button>
</template>

<style lang="sass" scoped></style>
