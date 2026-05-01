<script setup lang="ts">
import { product } from '@/api/api'
import IconFavorite from '@/components/icons/IconFavorite.vue'
import LayoutButtonToggle from '@/layout/LayoutButtonToggle.vue'
import { useToggle } from '@vueuse/core'

const toggle = useToggle(product.is_favorite)
</script>

<template>
  <LayoutButtonToggle
    title="Отобразить только избранные продукты"
    @click="toggle()"
    :is_active="product.is_favorite.value"
    :option_1="`избранные`"
    :option_2="`избранное`"
  >
    <IconFavorite class="relative z-2" :active="product.is_favorite.value" />
  </LayoutButtonToggle>
</template>
