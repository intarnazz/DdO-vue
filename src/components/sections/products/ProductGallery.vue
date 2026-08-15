<script setup lang="ts">
import { product } from '@/api/api'
import { Image } from '@/api/local_domains/catalog/product/types'
import ComponentImg from '@/components/ComponentImg.vue'
import { computed } from 'vue'

const emit = defineEmits<{
  set_current_image: [current_image: Image[], index: number]
}>()

const hidden_group_code = ['YouTube thumbnail', 'color']

const gallery = computed<Image[]>(() =>
  product.product.images.filter((e) => !hidden_group_code.includes(e.group_code)),
)
</script>

<template>
  <div class="product__gallery relative">
    <div
      v-for="(image, key) in gallery"
      :key="image.id"
      @click="() => emit('set_current_image', gallery, key)"
      class="h-25 product__gallery-item center cursor-zoom-in box br"
    >
      <ComponentImg class="br h-full object-cover" :id="image.id" :max_h="100" />
    </div>
  </div>
</template>

<style lang="sass" scoped>
//
.product
  &__gallery
    display: grid
    gap: 1rem
    grid-template-columns: repeat( auto-fill, minmax( 6.72rem , 1fr ) )
</style>
