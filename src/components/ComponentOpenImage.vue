<script setup lang="ts">
import { Image } from '@/api/local_domains/catalog/product/types'
import ComponentImg from '@/components/ComponentImg.vue'
import IconChevronLeftCastom from '@/components/icons/IconChevronLeftCastom.vue'
import IconChevronRightCastom from '@/components/icons/IconChevronRightCastom.vue'
import { computed, ref } from 'vue'

const { image: image_props, index: index_props = 0 } = defineProps<{
  image: Image | Image[]
  index?: number
}>()

const emit = defineEmits(['close'])

const images = computed(() => (Array.isArray(image_props) ? image_props : null))
const image = computed(() => (Array.isArray(image_props) ? null : image_props))
const index = ref(index_props)

const increment_index = (number: number) => {
  index.value += number
  if (images.value && index.value < 0) index.value = images.value.length - 1
  if (images.value && index.value >= images.value.length) index.value = 0
}
</script>

<template>
  <div class="select-none fixed top-0 left-0 w-full z-5 h-full center p-16">
    <div
      @click="emit('close', true)"
      class="open-image cursor-zoom-out absolute top-0 left-0 w-full h-full"
    />

    <ComponentImg
      @click="emit('close', true)"
      v-if="image"
      class="max-h-full relative cursor-zoom-out"
      ref="imageRef"
      :storage="image.path"
    />
    <ComponentImg
      @click="emit('close', true)"
      v-else-if="images"
      class="max-h-full relative cursor-zoom-out"
      ref="imageRef"
      :storage="images[index]?.path"
    />

    <template v-if="images">
      <button @click.prevent="increment_index(-1)" class="p-20 absolute left-0">
        <IconChevronLeftCastom />
      </button>
      <button @click.prevent="increment_index(1)" class="p-20 absolute right-0">
        <IconChevronRightCastom />
      </button>
    </template>
  </div>
</template>

<style scoped lang="sass">
.open-image
  background-color: rgba(0, 0, 0, .5)
</style>
