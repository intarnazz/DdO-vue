<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { image } from '@/api/api'

interface Props {
  id?: number
  storage?: string
  alt?: string
}

const props = defineProps<Props>()

const alt = computed(() => props.alt ?? 'image')
const fullSrc = computed(() => {
  if (props.id) return image.get_by_id(props.id)
  if (props.storage) return image.get_by_storage(props.storage)
})

const imgRef = ref<HTMLImageElement | null>(null)
const src = ref<string | undefined>(undefined)
const loaded = ref(false)

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          src.value = fullSrc.value
          observer.disconnect()
        }
      })
    },
    { rootMargin: '200px' }, // начать загрузку за 200px до появления
  )

  if (imgRef.value) observer.observe(imgRef.value)
})
</script>

<template>
  <img ref="imgRef" :src="src" :alt="alt" :class="{ loaded }" @load="loaded = true" />
</template>

<style scoped lang="sass">
img
  opacity: 0
  transition: opacity 0.3s ease

  &.loaded
    opacity: 1
</style>
