<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'
import { image } from '@/api/api'
const {
  id,
  max_w,
  max_h,
  storage,
  alt = 'image',
  isLazy = true,
} = defineProps<{
  id?: number
  max_w?: number
  max_h?: number
  storage?: string
  alt?: string
  isLazy?: boolean
}>()

const src = computed(() => {
  if (id)
    return image.get_by_id(id, {
      h: max_h,
      w: max_w,
    })
  if (storage) return image.get_by_storage(storage)
  return undefined
})

const imgRef = ref<HTMLImageElement | null>(null)
const lazySrc = ref<string | undefined>(undefined)
const loaded = ref(false)
const isVisible = ref(false)

let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!isLazy) return

  observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0] as IntersectionObserverEntry | undefined
      if (!entry?.isIntersecting) return

      isVisible.value = true
      lazySrc.value = src.value
      observer?.disconnect()
    },
    { rootMargin: '200px' },
  )

  if (imgRef.value) observer.observe(imgRef.value)
})

onUnmounted(() => observer?.disconnect())

// src может прийти позже чем сработал observer (props ещё не были готовы)
// isVisible гарантирует что обновляем lazySrc только для видимых элементов
watch(src, (newSrc) => {
  if (!isLazy || !isVisible.value) return
  loaded.value = false
  lazySrc.value = newSrc
})
</script>

<template>
  <template v-if="!isLazy">
    <img :src="src" :alt="alt" />
  </template>
  <template v-else>
    <img
      class="lazy"
      ref="imgRef"
      :src="lazySrc"
      :alt="alt"
      :class="{ loaded }"
      @load="loaded = true"
    />
  </template>
</template>

<style scoped lang="sass">
img.lazy
  opacity: 0
  transition: opacity .125s ease

  &.loaded
    opacity: 1
</style>
