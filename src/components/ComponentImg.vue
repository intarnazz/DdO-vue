<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue'
import { image } from '@/api/api'

interface Props {
  id?: number
  storage?: string
  alt?: string
  isLazy?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isLazy: true,
})

const alt = computed(() => props.alt ?? 'image')

const src = computed(() => {
  if (props.id) return image.get_by_id(props.id)
  if (props.storage) return image.get_by_storage(props.storage)
})

const imgRef = ref<HTMLImageElement | null>(null)
const lazySrc = ref<string | undefined>(undefined)
const loaded = ref(false)

let isVisible = false

onMounted(() => {
  if (!props.isLazy) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible = true
          lazySrc.value = src.value
          observer.disconnect()
        }
      })
    },
    { rootMargin: '200px' },
  )

  if (imgRef.value) observer.observe(imgRef.value)
})

watch(src, (newSrc) => {
  if (!props.isLazy || !isVisible) return
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
