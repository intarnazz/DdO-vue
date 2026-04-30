<script setup lang="ts">
import { filter } from '@/api/api'
import { ref, computed } from 'vue'
import LayoutResize from '@/layout/LayoutResize.vue'
import ButtonSwitch from '@/components/buttons/ButtonSwitch.vue'
import ComponentSwitch from '@/components/ComponentSwitch.vue'

/**
 * Интерфейс для элементов входных аргументов.
 */
interface ArgItem {
  /** Отображаемый текст элемента. */
  text: string
  /** Тип элемента. */
  type: string
  /** Описание элемента. */
  desc?: string
  /** Флаг переключения. */
  turn?: boolean
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
 * Вычисляемый индекс активной вкладки на основе filter.order.
 * Автоматически реагирует на любые изменения filter.order.
 */
const active = computed<number>(() => {
  const orderType = typeof filter.order === 'string' ? filter.order : String(filter.order)
  const idx = content.value.findIndex((item) => item.type === orderType)
  return idx >= 0 ? idx : 0
})

/**
 * Устанавливает активную вкладку и эмитит выбранный элемент.
 * @param key Индекс вкладки для активации.
 */
function setActive(key: number) {
  if (!content.value[key]) return
  filter.order = content.value[key].type
  filter.desc = content.value[key].desc || ''
}
</script>

<template>
  <div class="box-x switch-nav">
    <div class="box-y">
      <div class="box-x switch-nav__button-wrapper">
        <LayoutResize
          v-for="(button, key) in content"
          :key="key"
          :button="button"
          :class="{ 'active-tab': active === key }"
        >
          <ButtonSwitch @click="setActive(key)" :active="active" :button="button" :index="key" />
        </LayoutResize>
      </div>
      <ComponentSwitch :content="content" :active="active" />
    </div>
    <div class="flex-1"></div>
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
