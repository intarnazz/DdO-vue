<script setup lang="ts">
import { Image } from '@/api/local_domains/catalog/product/types'
import ComponentImg from '@/components/ComponentImg.vue'

const { image } = defineProps<{
  image: Image
}>()

const emit = defineEmits(['close'])

// TODO: silde
</script>

<template>
  <div
    @click="emit('close', true)"
    class="open-image select-none cursor-zoom-out fixed top-0 left-0 w-full z-4 h-full center p-16"
  >
    <ComponentImg class="max-h-full" ref="imageRef" :id="image.id" />
  </div>
</template>

<style scoped lang="sass">
.open-image
  background-color: rgba(0, 0, 0, .5)
</style>
