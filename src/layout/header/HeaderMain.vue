<script setup lang="ts">
// import MainAddress from '@/layout/header/main/MainAddress.vue'
import MainNav from '@/layout/header/main/MainNav.vue'
import ProductNav from '@/layout/header/main/ProductNav.vue'
// import { useToggle } from '@vueuse/core'
// import { watch } from 'vue'
// import { useRoute } from 'vue-router'

// const route = useRoute()

// const [overlayIsOpen, toggle] = useToggle(false)

// watch(
//   () => route.fullPath,
//   () => toggle(false),
// )
</script>

<template>
  <header class="header">
    <MainNav class="pr z-5" />
  </header>
  <!-- <ProductNav
    @open_sub_content="toggle"
    :overlay-is-open="overlayIsOpen"
    class="sticky top-0 z-4"
  /> -->
  <!-- <ProductNav :overlay-is-open="overlayIsOpen" class="sticky top-0 z-4" /> -->
  <ProductNav class="sticky top-0 z-4" />
  <!-- <div
    v-if="overlayIsOpen"
    @click="toggle(false)"
    class="overlay fixed z-3 top-0 left-0 w-full h-full bg-black opacity-20"
  ></div> -->
</template>

<style lang="sass" scoped></style>
