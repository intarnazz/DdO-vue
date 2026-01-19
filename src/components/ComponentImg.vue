<script setup lang="ts">
import { computed } from 'vue'
import { image } from '@/api/api'

/**
 * Интерфейс для props компонента ImageComponent
 */
interface Props {
  /** Идентификатор изображения для получения через API */
  id: number
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
</script>

<template>
  <!-- 
    Компонент для отображения изображения.
    Источник изображения берется через image.get(id) из API.
  -->
  <img :src="image.get(props.id)" :alt="alt" />
</template>

<style scoped lang="sass"></style>
