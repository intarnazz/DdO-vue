<script setup lang="ts">
import { computed, watch } from 'vue'
import { useScroll } from '@vueuse/core'
import { filter } from '@/api/api'
import { up, up_fast } from '@/utilte/utilte'

const { y } = useScroll(window)

const h = computed(() => y.value)

watch(() => filter.offset, up_fast)
</script>

<template>
  <button
    @click="up()"
    class="button-up__wrapper fixed z-1 right-8 bottom-8"
    :class="{
      'button-up__active': h > 0,
      'button-up__off': h === 0,
    }"
  >
    <div class="button-up center w-15 h-15 rounded-full">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#fff" class="w-6 h-6">
        <path d="M440-160v-487L216-423l-56-57 320-320 320 320-56 57-224-224v487h-80Z" />
      </svg>
    </div>
  </button>
</template>

<style lang="sass" scoped>
//
.button-up
  background-color: $mark
  box-shadow: 0 0 0px $main
  transition: .255s
  &__wrapper
    transition: .3s
    &:hover
      padding-bottom: .4rem
      & .button-up
        box-shadow: 0 0 20px $main
  &__off
    animation: off .255s ease-in forwards
    display: none
  &__active
    display: flex
    animation: on .255s ease-in forwards


@keyframes on
  0%
    opacity: 0%
    bottom: 4rem
  100%
    opacity: 100%
    bottom: 2rem

@keyframes off
  0%
    display: flex
    opacity: 100%
    bottom: 2rem
  40%
    bottom: 3rem
  100%
    display: none
    opacity: 0%
    bottom: 0rem
</style>
