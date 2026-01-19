<script setup lang="ts">
/**
 * Компонент-обертка LayoutOpener
 *
 * Используется для создания базовой структуры страниц,
 * на которых нужен минимальный высотный контейнер.
 * Содержимое компонента вставляется через слот.
 */
</script>

<template>
  <!-- Основной контейнер обертки -->
  <div class="opener w">
    <!-- Слот для вставки дочернего контента -->
    <slot></slot>
  </div>
</template>

<style lang="sass" scoped>
/* Вычисляемая высота контейнера (например, высота экрана) */
$headerCalc: calc(100dvh)
$menuCalc: calc(100dvh)

/* Основной контейнер обертки */
.opener
  min-height: $headerCalc
</style>
