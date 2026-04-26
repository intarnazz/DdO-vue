<script setup lang="ts">
import { Color } from '@/api/local_domains/catalog/product/types'
import { computed, ComputedRef } from 'vue'

const { colors, is_active = false } = defineProps<{
  colors: Color[]
  is_active?: boolean
}>()

const color_style: ComputedRef<string | false> = computed(() => {
  if (colors[0] && colors[1])
    return `background: linear-gradient(${colors[0].name} 50%, ${colors[1].name} 50%);`
  if (colors[0]) return `background: ${colors[0].name};`

  return false
})
</script>

<template>
  <div
    v-if="color_style"
    class="product__color-item w-12.5 h-12.5 rounded-full relative"
    :style="color_style"
  >
    <img
      v-if="is_active"
      class="absolute -top-2 -right-2"
      src="@/assets/icons/check_circle_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24 1.svg"
      alt="check"
    />
  </div>
</template>

<style lang="sass" scoped></style>
