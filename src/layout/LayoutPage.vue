<script setup lang="ts">
/**
 * Компонент MainWrapper
 *
 * Обертка для основного контента страницы.
 * Проверяет наличие токена в sessionStorage и хранит его локально.
 * Содержимое компонента вставляется через слот.
 */
</script>

<template>
  <!-- Основной контейнер страницы -->
  <main class="main box-y flex">
    <!-- Слот для вставки дочернего контента -->
    <slot></slot>
  </main>
</template>

<style lang="sass" scoped>
/* Основной контейнер контента */
.main
  justify-content: flex-start
  align-items: center
</style>
