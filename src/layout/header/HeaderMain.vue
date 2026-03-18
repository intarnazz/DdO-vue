<script setup lang="ts">
import MainAddress from '@/layout/header/main/MainAddress.vue'
import MainNav from '@/layout/header/main/MainNav.vue'
import ProductNav from '@/layout/header/main/ProductNav.vue'
// TODO: min 100dvh для страници
</script>

<template>
  <header class="header">
    <MainAddress class="pr z-3" />
    <MainNav class="pr z-2" />
    <ProductNav class="pr z-1" />
  </header>
</template>

<style lang="sass" scoped></style>
