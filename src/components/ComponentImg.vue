<script setup lang="ts">
import { computed } from 'vue'
import { image } from '@/api/api'

/**
 * Интерфейс для props компонента ImageComponent
 */
interface Props {
  /** Идентификатор изображения для получения через API */
  id?: number

  storage?: string
  /** Атрибут alt для изображения. Если не указан, используется значение по умолчанию 'image' */
  alt?: string
}

/**
 * Получаем props с типизацией
 */
const props = defineProps<Props>()

/**
 * Вычисляемый alt для тега img
 *
 * Если props.alt передан, используется он,
 * иначе значение по умолчанию 'image'
 */
const alt = computed(() => props.alt ?? 'image')

const src = computed(() => {
  if (props.id) return image.get_by_id(props.id)
  if (props.storage) return image.get_by_storage(props.storage)
})
</script>

<template>
  <!-- 
    Компонент для отображения изображения.
    Источник изображения берется через image.get(id) из API.
  -->
  <img :src="src" :alt="alt" />
</template>

<style scoped lang="sass"></style>
