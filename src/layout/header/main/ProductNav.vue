<script setup>
import LayoutWrapper from '@/layout/LayoutWrapper.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <div v-if="!isLoading" class="product-nav py-4 bs c-w">
    <LayoutWrapper>
      <div class="box-x">
        <!-- <div class="box-x gap2">
        </div> -->
        <RouterLink :to="{ name: 'home' }" class="">Акции</RouterLink>
        <RouterLink :to="{ name: 'catalog', params: { type: 'entrance-doors' } }" class=""
          >Входные двери</RouterLink
        >
        <RouterLink :to="{ name: 'home' }" class="">Межкомнотные двери</RouterLink>
        <RouterLink :to="{ name: 'home' }" class="">Фурнитура</RouterLink>
        <RouterLink :to="{ name: 'home' }" class="">Напольные покрытия</RouterLink>
        <RouterLink :to="{ name: 'home' }" class="">мебель</RouterLink>

        <img class="h-6" src="@/assets/icons/search.svg" alt="search" />
        <img class="h-6" src="@/assets/icons/favorite.svg" alt="favorite" />
        <img class="h-6" src="@/assets/icons/bar_chart.svg" alt="bar_chart" />
        <img class="h-6" src="@/assets/icons/shopping.svg" alt="shopping" />
      </div>
    </LayoutWrapper>
  </div>
</template>

<style lang="sass" scoped>
//
.product-nav
  +g
</style>
