<script setup lang="ts">
import LayoutWrapper from '@/layout/LayoutWrapper.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="nav py-2 bs bgf">
    <LayoutWrapper>
      <div class="box-x">
        <RouterLink :to="{ name: 'home' }">
          <img class="h-11" src="@/assets/icons/logo.svg" alt="logo" />
        </RouterLink>
        <nav class="box-x gap2 c-sub">
          <RouterLink :to="{ name: 'home' }">главная</RouterLink>
          <RouterLink :to="{ name: 'about-us' }">о нас</RouterLink>
          <RouterLink :to="{ name: 'brands' }">бренды</RouterLink>
          <!-- <RouterLink :to="{ name: 'home' }">вакансии</RouterLink> -->
          <RouterLink :to="{ name: 'about-us', hash: '#payment-and-delivery' }"
            >оплата и доставка</RouterLink
          >
          <RouterLink :to="{ name: 'contact' }">контакты</RouterLink>
        </nav>
      </div>
    </LayoutWrapper>
  </div>
</template>

<style lang="sass" scoped></style>
