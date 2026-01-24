<script setup>
import { RouterLink } from 'vue-router'
import IconRight from '@/components/icons/IconRight.vue'
</script>

<template>
  <div class="box-x 2 w">
    <RouterLink class="c-sub a" :to="{ name: 'home' }"> Главная </RouterLink>
    <IconRight />
    <RouterLink class="c-sub a" :to="{ name: 'home' }"> Каталог </RouterLink>
    <IconRight />
    <p class="c-sub">входные двери</p>
    <div class="flex"></div>
  </div>
</template>

<style scoped lang="sass"></style>
