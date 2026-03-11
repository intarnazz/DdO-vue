<script setup lang="ts">
import IconShopping from '@/components/icons/IconShopping.vue'
import LayoutButton from '@/layout/LayoutButton.vue'

function add_to_cart() {
  // TODO: add_to_cart & Сущность корзины
}
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
