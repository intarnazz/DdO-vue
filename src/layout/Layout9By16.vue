<script setup lang="ts">
import ComponentOpener from '@/layout/LayoutOpener.vue'

/**
 * Wrapper-компонент для страниц авторизации (логин, регистрация и т.д.)
 *
 * Использует LayoutOpener как внешний контейнер и предоставляет слоты:
 * - slot "image" — для отображения изображения или графики сбоку
 * - slot "default" — для основной формы или контента страницы
 */
</script>

<template>
  <!-- Обертка с внешним LayoutOpener -->
  <ComponentOpener>
    <!-- Основной блок страницы авторизации -->
    <section class="login w box-x h-screen">
      <!-- Левая часть: для изображения или иллюстрации -->
      <div class="wh pr flex9 flex media">
        <slot name="image"></slot>
      </div>

      <!-- Правая часть: для формы или основного контента -->
      <div class="login__wrapper wh box-y gap p5 flex16 flex">
        <!-- Пустое пространство для заголовка или верхнего отступа -->
        <div class="header-spase"></div>
        <!-- Основной слот контента -->
        <slot name="default"></slot>
      </div>
    </section>
  </ComponentOpener>
</template>

<style lang="sass" scoped></style>
