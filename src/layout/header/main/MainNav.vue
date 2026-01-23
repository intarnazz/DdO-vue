<script setup>
import LayoutWrapper from '@/layout/LayoutWrapper.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <div v-if="!isLoding" class="address py-2 bs">
    <LayoutWrapper>
      <div class="box-x">
        <img class="h-11" src="@/assets/icons/logo.svg" alt="logo" />

        <div class="box-x gap2">
          <RouterLink :to="{ name: 'home' }" class="a">главная</RouterLink>
          <RouterLink :to="{ name: 'about-us' }" class="a">о нас</RouterLink>
        </div>
      </div>
    </LayoutWrapper>
  </div>
</template>

<style lang="sass" scoped></style>
