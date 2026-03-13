<script setup lang="ts">
/**
 * @file ComponentOrder.vue
 * @description Vue-компонент, реализующий переключающую навигационную панель с динамическими ширинами вкладок.
 * Он использует LayoutResize для измерения ширины вкладок и отображает кнопки переключения.
 */

import { filter } from '@/api/api'
import { ref } from 'vue'
import LayoutResize from '@/layout/LayoutResize.vue'
import ComponentSwitch from '@/components/ComponentSwitch.vue'

/**
 * Интерфейс для элементов входных аргументов.
 */
interface ArgItem {
  number: number
  width: number
}

/**
 * Определяет свойства (props) для этого компонента.
 */
const props = defineProps<{
  /** Массив объектов для генерации элементов переключателя. */
  arguments: number[]
}>()

const numbers = ref<ArgItem[]>(
  props.arguments.map((n) => ({
    number: n,
    width: 0,
  })),
)

/**
 * Реактивная ссылка на индекс активной вкладки.
 */
const active = ref<number>(
  (() => {
    const active = props.arguments.indexOf(filter.limit)
    if (active < 0) return 0
    return active
  })(),
)

/**
 * Устанавливает активную вкладку и эмитит выбранный элемент.
 * @param key Индекс вкладки для активации.
 */
function setLimit(button: ArgItem, key: number) {
  active.value = key
  filter.limit = button.number
}
</script>

<template>
  <div class="box-x gap-4 switch-nav">
    <p>на странице:</p>
    <div class="box-y">
      <div class="box-x switch-nav__button-wrapper">
        <LayoutResize
          v-for="(button, key) in numbers"
          :key="key"
          :button="button"
          :class="{ 'active-tab': active === key }"
        >
          <button @click="setLimit(button, key)">
            {{ button.number }}
          </button>
        </LayoutResize>
      </div>
      <ComponentSwitch :content="numbers" :active="active" />
    </div>
  </div>
</template>

<style lang="sass" scoped>
.switch-nav
  font-weight: 400
  color: $sub
  & button
    &:hover
      color: $mark

.active-tab
  color: $main
</style>
