<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { image } from '@/api/api'

const {
  id,
  max_w,
  max_h,
  storage,
  alt = 'image',
  isLazy = true,
  priority,
} = defineProps<{
  id?: number
  max_w?: number
  max_h?: number
  storage?: string
  alt?: string
  isLazy?: boolean
  /** Приоритет загрузки (атрибут fetchpriority). Не задан — решает браузер. */
  priority?: 'high' | 'low' | 'auto'
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

const loaded = ref(false)

watch(src, () => {
  loaded.value = false
})
</script>

<template>
  <img
    class="fade"
    :class="{ loaded }"
    :src="src"
    :alt="alt"
    :loading="isLazy ? 'lazy' : 'eager'"
    :fetchpriority="priority"
    decoding="async"
    @load="loaded = true"
    @error="loaded = true"
  />
</template>

<style scoped lang="sass">
img.fade
  opacity: 0
  transition: opacity .125s ease

  &.loaded
    opacity: 1
</style>