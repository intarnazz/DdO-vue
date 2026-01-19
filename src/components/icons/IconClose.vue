<script setup> // dev
import { computed, onMounted, onUnmounted } from 'vue'

const props = defineProps('fill')
const emit = defineEmits(['click'])

const fill = computed(() => {
  return props.fill || '#fff'
})

const handleKeydown = (event) => {
  if (event.key === 'Escape') {
    emit('click')
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <svg
    @click="emit('click')"
    :fill="fill"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    version="1.1"
    aria-hidden="false"
    style="flex-shrink: 0"
  >
    <desc lang="en-US">An X shape</desc>
    <path
      d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41Z"
    ></path>
  </svg>
</template>

<style lang="sass" scoped>
svg
  cursor: pointer
</style>
