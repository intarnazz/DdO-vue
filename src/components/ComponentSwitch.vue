<script setup lang="ts">
/**
 * @file SwitchNav.vue
 * @description A Vue component that implements a switch navigation bar with dynamic tab widths and an active indicator bar.
 * It uses LayoutResize to measure tab widths and computes positions for the active bar.
 */

import { filter } from '@/api/api'
import LayoutResize from '@/layout/LayoutResize.vue'
import { computed, onMounted, ref } from 'vue'

/**
 * Constant gap size between tabs in pixels.
 */
const GAP: number = 16

/**
 * Interface for input argument items.
 */
interface ArgItem {
  /** The display text of the item. */
  text: string
  /** The type of the item. */
  type: string
}

/**
 * Interface for individual switch items.
 */
interface SwitchItem extends ArgItem {
  /** The measured width of the switch item. */
  width: number
}

/**
 * Defines the props for this component.
 */
const props = defineProps<{
  /** Array of objects to generate switch items from. */
  arguments: ArgItem[]
}>()

function init(): void {
  // Попытаться найти индекс элемента, у которого type совпадает с filter.order
  const orderType = typeof filter.order === 'string' ? filter.order : String(filter.order)
  const idx = content.value.findIndex((item) => item.type === orderType)

  // Если найден — установить active на этот индекс, иначе оставить 0
  active.value = idx >= 0 ? idx : 0
}

onMounted(() => {
  init()
})

/**
 * Creates a SwitchItem from a given ArgItem.
 * @param item The input ArgItem.
 * @returns A new SwitchItem object.
 */
function switch_element(item: ArgItem): SwitchItem {
  return {
    text: item.text,
    type: item.type,
    width: 0,
  }
}

/**
 * Maps an array of ArgItems to an array of SwitchItems.
 * @param arr The array of ArgItems.
 * @returns An array of SwitchItems.
 */
function switchs(arr: ArgItem[]): SwitchItem[] {
  return arr.map(switch_element)
}

/**
 * Reactive reference to the array of switch items.
 */
const content = ref<SwitchItem[]>(switchs(props.arguments))

/**
 * Reactive reference to the index of the active tab.
 */
const active = ref<number>(0)

/**
 * Computed property for the left offset of the active bar.
 * @returns The calculated left position in pixels.
 */
const left = computed<number>(() => {
  const sum = content.value.slice(0, active.value).reduce((acc, item) => acc + item.width, 0)
  return sum + GAP * active.value
})

/**
 * Computed property for the width of the active switch.
 * @returns The width of the active tab in pixels.
 */
const switch_width = computed<number>(() => content.value[active.value].width)

/**
 * Computed property for the right offset of the active bar.
 * @returns The calculated right position in pixels.
 */
const right = computed<number>(() => {
  const sum = content.value.slice(active.value + 1).reduce((acc, item) => acc + item.width, 0)
  return sum + GAP * (content.value.length - 1 - active.value)
})

/**
 * Updates the width of a switch item.
 * @param value The SwitchItem to update.
 * @param width The new width value.
 */
function widthChanged(value: SwitchItem, width: number) {
  value.width = width
}

/**
 * Sets the active tab and emits the selected item.
 * @param key The index of the tab to activate.
 */
function setActive(key: number) {
  active.value = key
  filter.order = content.value[key].type
}
</script>

<template>
  <div class="box-x switch-nav">
    <div class="box-y">
      <div class="box-x switch-nav__button-wrapper">
        <LayoutResize
          v-for="(value, key) in content"
          :key="key"
          :class="{ 'active-tab': active === key }"
          @click="setActive(key)"
          @widthChanged="(width) => widthChanged(value, width)"
        >
          <button>{{ value.text }}</button>
        </LayoutResize>
      </div>
      <div class="box-x ative-bar">
        <div :style="`flex: 0 0 ${left}px;`" class="ative-bar__left"></div>
        <div :style="`flex: 0 0 ${switch_width}px;`" class="ative-bar__switch h-1.25"></div>
        <div :style="`flex: 0 0 ${right}px;`" class="ative-bar__right"></div>
      </div>
    </div>
    <div class="flex"></div>
  </div>
</template>

<style lang="sass" scoped>
//
.switch-nav
  font-weight: 400
  color: $sub
  &__button-wrapper
    gap: 16px
  & button
    &:hover
      color: $mark

.ative-bar
  &__switch
    background-color: $main
    transition: flex-basis 0.3s ease
  &__left,
  &__right
    transition: flex-basis 0.3s ease

.active-tab
  color: $main
</style>
