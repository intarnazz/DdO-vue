<script setup lang="ts">
import { ref } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import type { Ref } from 'vue'

interface Button {
  width: number
}

const { button } = defineProps<{
  button: Button
}>()

const resizableElement: Ref<HTMLElement | null> = ref(null)

useResizeObserver(resizableElement, () => {
  if (resizableElement.value) {
    Object.assign(button, { width: resizableElement.value.offsetWidth })
  }
})
</script>

<template>
  <div ref="resizableElement" class="resizable">
    <slot />
  </div>
</template>
