<script setup></script>

<template>
  <button class="button relative box-x justify-start as">
    <div class="button__content-wrapper box-x gap-4 px-4">
      <img src="@/assets/icons/clear_all.svg" alt="clear_all" />
      <p>Очистить все фильтры</p>
    </div>
    <img src="@/assets/icons/button_tip.svg" alt="button_tip" />
  </button>
</template>

<style lang="sass" scoped>
//
.button
  &__content-wrapper
    +g
    border-top-left-radius: 5px
    border-bottom-left-radius: 5px
</style>
