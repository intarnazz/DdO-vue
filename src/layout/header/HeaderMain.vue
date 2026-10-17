<script setup lang="ts">
import MainNav from '@/layout/header/main/MainNav.vue'
import ProductNav from '@/layout/header/main/ProductNav.vue'
import { useToggle, useWindowScroll } from '@vueuse/core'
import { watch } from 'vue'

const SCROLL_THRESHOLD = 5
const HEADER_HEIGHT = 200

const { y } = useWindowScroll()
const [is_hidden, toggle] = useToggle(false)

let last_y = 0

watch(y, (new_y) => {
  if (new_y <= HEADER_HEIGHT) {
    is_hidden.value = false
    last_y = new_y
    return
  }

  const diff = new_y - last_y
  if (Math.abs(diff) < SCROLL_THRESHOLD) return

  toggle(diff > 0)
  last_y = new_y
})
</script>

<template>
  <header class="header">
    <MainNav class="pr z-5" />
  </header>

  <ProductNav class="product-nav sticky top-0 z-4" :class="{ 'is-hidden': is_hidden }" />
</template>

<style lang="sass" scoped>
.product-nav
  transition: transform 0.2s ease
  will-change: transform

  &.is-hidden
    transform: translateY(-100%)

@media (prefers-reduced-motion: reduce)
  .product-nav
    transition: none
</style>
