<script setup lang="ts">
import LayoutWrapper from '@/layout/LayoutWrapper.vue'
import RouterLinkCatalog from '@/layout/router-links/RouterLinkCatalog.vue';
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="product-nav py-4 bs c-w">
    <LayoutWrapper>
      <div class="box-x">
        <!-- <div class="box-x gap2">
        </div> -->
        <RouterLink :to="{ name: 'home' }" class="">Акции</RouterLink>
        <RouterLinkCatalog :type_id="1" :type_name="`entrance-doors`">входные двери</RouterLinkCatalog>
        <RouterLinkCatalog :type_id="2" :type_name="`interior-doors`">межкомнотные двери</RouterLinkCatalog>
        <RouterLink :to="{ name: 'home' }" class="">фурнитура</RouterLink>
        <RouterLink :to="{ name: 'home' }" class="">напольные покрытия</RouterLink>
        <!-- <RouterLink :to="{ name: 'home' }" class="">мебель</RouterLink> -->
        <RouterLinkCatalog :type_id="3" :type_name="`kitchens`">кухни</RouterLinkCatalog>
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
