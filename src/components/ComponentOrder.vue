<script setup lang="ts">
/**
 * @file ComponentOrder.vue
 * @description Vue-компонент, реализующий переключающую навигационную панель с динамическими ширинами вкладок.
 * Он использует LayoutResize для измерения ширины вкладок и отображает кнопки переключения.
 */

import { filter } from '@/api/api'
import { onMounted, ref } from 'vue'
import LayoutResize from '@/layout/LayoutResize.vue'
import ButtonSwitch from '@/components/buttons/ButtonSwitch.vue'
import ComponentSwitch from '@/components/ComponentSwitch.vue' // Предполагаемый путь к новому компоненту

/**
 * Константа для размера промежутка между вкладками в пикселях.
 */
const GAP: number = 16

/**
 * Интерфейс для элементов входных аргументов.
 */
interface ArgItem {
  /** Отображаемый текст элемента. */
  text: string
  /** Тип элемента. */
  type: string
  /** Описание элемента. */
  desc: string
  /** Флаг переключения. */
  turn: boolean
}

/**
 * Интерфейс для отдельных элементов переключателя.
 */
interface SwitchItem extends ArgItem {
  /** Измеренная ширина элемента переключателя. */
  width: number
}

/**
 * Определяет свойства (props) для этого компонента.
 */
const props = defineProps<{
  /** Массив объектов для генерации элементов переключателя. */
  arguments: ArgItem[]
}>()

/**
 * Инициализирует компонент, устанавливая активную вкладку на основе значения filter.order.
 */
function init(): void {
  // Попытаться найти индекс элемента, у которого type совпадает с filter.order
  const orderType = typeof filter.order === 'string' ? filter.order : String(filter.order)
  const idx = content.value.findIndex((item) => item.type === orderType)

  // Если найден — установить active на этот индекс, иначе оставить 0
  active.value = idx >= 0 ? idx : 0
}

/**
 * Хук жизненного цикла, вызываемый после монтирования компонента.
 */
onMounted(() => {
  init()
})

/**
 * Создает объект SwitchItem на основе переданного ArgItem.
 * @param item Входной объект ArgItem.
 * @returns Новый объект SwitchItem.
 */
function switch_element(item: ArgItem): SwitchItem {
  return {
    text: item.text,
    type: item.type,
    desc: item.desc || '',
    turn: item.turn || false,
    width: 0,
  }
}

/**
 * Преобразует массив ArgItem в массив SwitchItem.
 * @param arr Массив объектов ArgItem.
 * @returns Массив объектов SwitchItem.
 */
function switchs(arr: ArgItem[]): SwitchItem[] {
  return arr.map(switch_element)
}

/**
 * Реактивная ссылка на массив элементов переключателя.
 */
const content = ref<SwitchItem[]>(switchs(props.arguments))

/**
 * Реактивная ссылка на индекс активной вкладки.
 */
const active = ref<number>(0)

/**
 * Обновляет ширину элемента переключателя.
 * @param value Объект SwitchItem для обновления.
 * @param width Новое значение ширины.
 */
function widthChanged(value: SwitchItem, width: number) {
  value.width = width
}

/**
 * Устанавливает активную вкладку и эмитит выбранный элемент.
 * @param key Индекс вкладки для активации.
 */
function setActive(key: number) {
  active.value = key
  filter.order = content.value[key].type
  filter.desc = content.value[key].desc
}
</script>

<template>
  <div class="box-x switch-nav">
    <div class="box-y">
      <div class="box-x switch-nav__button-wrapper">
        <LayoutResize
          v-for="(button, key) in content"
          :key="key"
          :class="{ 'active-tab': active === key }"
          @widthChanged="(width) => widthChanged(button, width)"
        >
          <ButtonSwitch @click="setActive(key)" :active="active" :button="button" :index="key" />
        </LayoutResize>
      </div>
      <ComponentSwitch :content="content" :active="active" />
    </div>
    <div class="flex"></div>
  </div>
</template>

<style lang="sass" scoped>
.switch-nav
  font-weight: 400
  color: $sub
  &__button-wrapper
    gap: 16px
  & button
    &:hover
      color: $mark

.active-tab
  color: $main
</style>
