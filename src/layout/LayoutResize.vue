<script setup lang="ts">
/**
 * @file LayoutResize.vue
 * @description A Vue component that wraps content and emits its width changes using ResizeObserver.
 * This component is useful for dynamically resizing layouts based on content width.
 */

import { ref, onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'

interface Button {
  width: number
}

const props = defineProps<{
  button: Button
}>()

/**
 * Reference to the resizable DOM element.
 */
const resizableElement: Ref<HTMLElement | null> = ref(null)

/**
 * Instance of ResizeObserver to monitor size changes of the element.
 */
let resizeObserver: ResizeObserver | null = null

/**
 * Emits the current width of the resizable element if it exists.
 */
const emitWidth = () => {
  if (resizableElement.value) {
    const width = resizableElement.value.offsetWidth
    Object.assign(props.button, { width: width })
  }
}

/**
 * Lifecycle hook to initialize the ResizeObserver and emit initial width on component mount.
 */
onMounted(() => {
  emitWidth()
  resizeObserver = new ResizeObserver(() => {
    emitWidth()
  })
  if (resizableElement.value) {
    resizeObserver.observe(resizableElement.value)
  }
})

/**
 * Lifecycle hook to clean up the ResizeObserver on component unmount.
 */
onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
})
</script>

<template>
  <div ref="resizableElement" class="resizable">
    <slot></slot>
  </div>
</template>

<style lang="sass" scoped>
//
</style>
