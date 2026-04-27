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
.wrapper
  max-width: 1300px
  width: 100%
  padding: 0 2rem
  margin: 0 auto

/* Адаптивные стили для экранов шириной <= 1440px */
@media screen and (max-width: 1440px)
  .special-wrapper
    width: 100%
  .wrapper
    width: 100%
    margin: 0 auto
    padding: 0 2rem

/* Адаптивные стили для экранов шириной <= 590px */
@media screen and (max-width: 590px)
  .wrapper
    width: 100%
    margin: 0
    padding: 1rem
</style>
