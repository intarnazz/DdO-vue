<script setup lang="ts">
/**
 * @file ComponentSwitch.vue
 * @description Vue-компонент, реализующий индикатор активной полосы для переключающей навигационной панели.
 * Вычисляет позиции и ширину активной полосы на основе предоставленных элементов и активного индекса.
 */

import { computed } from 'vue'

/**
 * Константа для размера промежутка между вкладками в пикселях.
 */
const GAP: number = 16

/**
 * Интерфейс для отдельных элементов переключателя.
 */
interface SwitchItem {
  /** Измеренная ширина элемента переключателя. */
  width: number
}

/**
 * Определяет свойства (props) для этого компонента.
 */
const props = defineProps<{
  /** Массив элементов переключателя. */
  content: SwitchItem[]
  /** Индекс активной вкладки. */
  active: number
}>()

/**
 * Вычисляемое свойство для левого отступа активной полосы.
 * @returns Вычисленная левая позиция в пикселях.
 */
const left = computed<number>(() => {
  const sum = props.content.slice(0, props.active).reduce((acc, item) => acc + item.width, 0)
  return sum + GAP * props.active
})

/**
 * Вычисляемое свойство для ширины активного переключателя.
 * @returns Ширина активной вкладки в пикселях.
 */
const switch_width = computed<number>(() => props.content[props.active].width)

/**
 * Вычисляемое свойство для правого отступа активной полосы.
 * @returns Вычисленная правая позиция в пикселях.
 */
const right = computed<number>(() => {
  const sum = props.content.slice(props.active + 1).reduce((acc, item) => acc + item.width, 0)
  return sum + GAP * (props.content.length - 1 - props.active)
})
</script>

<template>
  <div class="box-x active-bar">
    <div :style="`flex: 0 0 ${left}px;`" class="active-bar__left"></div>
    <div :style="`flex: 0 0 ${switch_width}px;`" class="active-bar__switch h-0.75"></div>
    <div :style="`flex: 0 0 ${right}px;`" class="active-bar__right"></div>
  </div>
</template>

<style lang="sass" scoped>
.active-bar
  &__switch
    background-color: $main
    transition: flex-basis 0.3s ease
  &__left,
  &__right
    transition: flex-basis 0.3s ease
</style>
