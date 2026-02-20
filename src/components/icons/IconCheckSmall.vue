<script setup lang="ts">
import { computed } from 'vue'

/**
 * Props interface for the SVG icon component.
 *
 * This interface defines the properties that can be passed to the component.
 */
interface Props {
  /**
   * The fill color for the SVG icon.
   */
  fill: string
}

const props = defineProps<Props>()

/**
 * Function to convert HEX color to HSL.
 *
 * @param hex - The HEX color string (e.g., '#1D6498').
 * @returns An object with h, s, l values.
 */
function hexToHsl(hex: string): { h: number; s: number; l: number } {
  hex = hex.replace('#', '')
  const r = parseInt(hex.substring(0, 2), 16) / 255
  const g = parseInt(hex.substring(2, 4), 16) / 255
  const b = parseInt(hex.substring(4, 6), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }

    h /= 6
  }

  return { h: h * 360, s: s * 100, l: l * 100 }
}

/**
 * Computed property that determines the fill color based on the lightness of props.fill.
 *
 * If the lightness (L in HSL) is <= 50, returns '#fff'; otherwise, returns '#000'.
 */
const fill = computed(() => {
  const { l } = hexToHsl(props.fill)
  return l < 50 ? '#fff' : '#000'
})
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
    :style="`fill: ${fill};`"
  >
    <path d="M400-304 240-464l56-56 104 104 264-264 56 56-320 320Z" />
  </svg>
</template>

<style lang="sass" scoped>
//
</style>
