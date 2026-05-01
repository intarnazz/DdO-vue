<script setup lang="ts">
import { user } from '@/api/api'
import IconPottedPlant from '@/components/icons/IconPottedPlant.vue'
import LayoutButtonToggle from '@/layout/LayoutButtonToggle.vue'
import { useToggle } from '@vueuse/core'

const product_interior_toggle = useToggle(user.interior_is_active)
</script>

<template>
  <LayoutButtonToggle
    title="Включить отображение интерьера"
    @click="product_interior_toggle()"
    :is_active="user.interior_is_active.value"
    :option_1="`показать интерьер`"
    :option_2="`скрыть интерьер`"
  >
    <IconPottedPlant class="relative z-2" :active="user.interior_is_active.value" />
  </LayoutButtonToggle>
</template>
