<script setup lang="ts">
import { product, filter } from '@/api/api'
import { computed, ref } from 'vue'
import { price } from '@/utilte/utilte'
import ComponentRecolorText from '@/components/ComponentRecolorText.vue'

const STEP = 5000

function roundUp(value: number) {
  return Math.ceil(value / STEP) * STEP
}

/**
 * Минимальная цена товаров (берётся из мета-данных API).
 *
 * @type {ComputedRef<number>}
 * @default 0
 */
const _min = computed(() => product.products?.meta.price.min ?? 0)
const min = computed(() => roundUp(_min.value))

/**
 * Максимальная цена товаров (берётся из мета-данных API).
 *
 * @type {ComputedRef<number>}
 * @default 0
 */
const _max = computed(() => product.products?.meta.price.max ?? 0)
const max = computed(() => roundUp(_max.value))

/**
 * Текущее выбранное значение максимальной цены (ползунок).
 *
 * Инициализируется текущей минимальной ценой при монтировании компонента.
 *
 * @type {Ref<number>}
 */
const _range = ref(roundUp(Number(filter.filters['price-max'])) || max.value)
const range = computed(() => (_range.value != max.value ? String(_range.value) : null))

/**
 * Обработчик изменения значения слайдера.
 *
 * Записывает выбранное значение в глобальный фильтр `filter.filters['price-max']`.
 * Вызывается при каждом изменении `range.value`.
 */
function rangeChange() {
  filter.filters = {
    'price-max': range.value,
  }
}
</script>

<template>
  <div class="input_box box-y gap-4 px-4 py-2">
    <input @change="rangeChange" v-model="_range" :max="max" :min="min" step="5000" type="range" />

    <div class="box-x center">
      <p v-if="range" class="font-normal price">
        <span class="c-sub font-light">до: </span>
        <ComponentRecolorText :text="price(range)" />
      </p>
      <p v-else class="c-sub">любая цена</p>
    </div>
  </div>
</template>

<style lang="sass" scoped>
//
input[type="range"]
  -webkit-appearance: none
  appearance: none
  width: 100%
  height: 6px
  background: $main
  cursor: pointer
  border-radius: 100px

  &::-webkit-slider-runnable-track
    height: 6px
    border-radius: 100px
    background: $main

  &::-webkit-slider-thumb
    -webkit-appearance: none
    appearance: none
    width: 16px
    height: 16px
    border-radius: 50%
    background: $mark
    margin-top: -5px
    box-shadow: 0 0 0 2px $w

  &::-moz-range-track
    background: $main
    height: 6px
    border-radius: 100px

  &::-moz-range-progress
    background: $main
    height: 6px
    border-radius: 100px

  &::-moz-range-thumb
    width: 16px
    height: 16px
    border-radius: 50%
    background: $mark
    border: none
</style>
