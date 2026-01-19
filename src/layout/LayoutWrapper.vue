<script setup lang="ts">
/**
 * Компонент Wrapper
 *
 * Базовый контейнер для контента страницы.
 * Использует слот для вставки дочернего содержимого.
 * Позволяет централизованно задавать ширину и адаптивные отступы.
 */
</script>

<template>
  <!-- Основной контейнер с возможностью вставки контента через слот -->
  <div class="wrapper">
    <slot></slot>
  </div>
</template>

<style lang="sass" scoped>
/* Переход для стандартного состояния элементов */
.default
  transition: .5s

/* Специальный контейнер с шириной с учетом отступов */
.special-wrapper
  width: calc(100dvw - 8rem)

/* Основной контейнер страницы */
.wrapper
  width: 1300px
  margin: 0 auto

/* Адаптивные стили для экранов шириной <= 1440px */
@media screen and (max-width: 1440px)
  .special-wrapper
    width: 100%
  .wrapper
    width: 100%
    margin: 0
    padding: 0

/* Адаптивные стили для экранов шириной <= 590px */
@media screen and (max-width: 590px)
  .wrapper
    width: 100%
    margin: 0
    padding: 0
</style>
