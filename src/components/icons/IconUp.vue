<script setup lang="ts">
import { filter } from '@/api/api'
import { up, up_fast } from '@/utilte/utilte'
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'

const scrollY = ref(0)

const onScroll = () => {
  scrollY.value = window.scrollY || document.documentElement.scrollTop
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

const h = computed(() => scrollY.value)

watch(() => filter.offset, up_fast)
</script>

<template>
  <div
    @click="up()"
    class="button-up__wrapper"
    :class="{
      'button-up__active': h > 0,
      'button-up__off': h === 0,
    }"
  >
    <div class="button-up center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#fff"
      >
        <path d="M440-160v-487L216-423l-56-57 320-320 320 320-56 57-224-224v487h-80Z" />
      </svg>
    </div>
  </div>
</template>

<style lang="sass" scoped>
//
.button-up
  background-color: $mark
  width: 60px
  height: 60px
  border-radius: 60px
  box-shadow: 0 0 0px $main
  transition: .255s
  &__wrapper
    position: fixed
    cursor: pointer
    bottom: 2rem
    right: 2rem
    z-index: 1
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
