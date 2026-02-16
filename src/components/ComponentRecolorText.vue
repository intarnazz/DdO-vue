<script setup lang="ts">
/**
 * Компонент **ComponentRecolorText**
 *
 * Выделяет **все буквы «Р»** (кириллица) в переданном тексте особым стилем.
 * Остальной текст остаётся без изменений.
 *
 * Используется для брендированного выделения буквы «Р» (например, в случае указания цены в рублях).
 *
 * @example
 * ```vue
 * <ComponentRecolorText text="10 000 Р" />
 * ```
 * Результат: 10 000 **Р**!
 */
import { computed } from 'vue'

/**
 * Пропсы компонента
 */
interface Props {
  /**
   * Текст, в котором нужно выделить все буквы «Р».
   *
   * @example "10 000 Р"
   */
  text: string
}

const props = defineProps<Props>()

// Разбиваем строку на части, сохраняя буквы «Р» как отдельные элементы
const parts = computed(() => props.text.split(/(Р)/g))
</script>

<template>
  <span>
    <template v-for="(part, i) in parts" :key="i">
      <span v-if="part === 'Р'" class="color-main font">Р</span>
      <span v-else>{{ part }}</span>
    </template>
  </span>
</template>

<style lang="sass">
//
</style>
