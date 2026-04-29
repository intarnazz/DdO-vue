<script setup lang="ts">
/**
 * @file ComponentOrder.vue
 * @description Vue-компонент, реализующий переключающую навигационную панель с динамическими ширинами вкладок.
 * Он использует LayoutResize для измерения ширины вкладок и отображает кнопки переключения.
 */

import { filter } from '@/api/api'
import { ref, computed } from 'vue'
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
 * Вычисляемый индекс активной вкладки на основе filter.limit.
 * Автоматически реагирует на любые изменения filter.limit.
 */
const active = computed<number>(() => {
  const idx = numbers.value.findIndex((item) => item.number === filter.limit)
  return idx >= 0 ? idx : 0
})

/**
 * Устанавливает активную вкладку и эмитит выбранный элемент.
 * @param button Элемент переключателя.
 */
function setLimit(button: ArgItem) {
  filter.limit = button.number
}
</script>

<template>
  <div class="box-x js gap-4 switch-nav c-sub">
    <p>на странице:</p>
    <div class="box-y">
      <div class="box-x switch-nav__button-wrapper">
        <LayoutResize
          v-for="(button, key) in numbers"
          :key="key"
          :button="button"
          :class="{ 'active-tab': active === key }"
        >
          <button @click="setLimit(button)">
            <strong>{{ button.number }}</strong>
          </button>
        </LayoutResize>
      </div>
      <ComponentSwitch :content="numbers" :active="active" />
    </div>
  </div>
</template>

<style lang="sass" scoped>
.switch-nav
  & button
    &:hover
      color: $mark

.active-tab
  color: $main
</style>
