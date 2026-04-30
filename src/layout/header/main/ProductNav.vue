<script setup lang="ts">
// import LayoutPopup from '@/layout/LayoutPopup.vue'
import LayoutWrapper from '@/layout/LayoutWrapper.vue'
import RouterLinkCatalog from '@/layout/router-links/RouterLinkCatalog.vue'
</script>

<template>
  <div class="product-nav py-4 bs">
    <LayoutWrapper>
      <div class="box-x gap-16">
        <div class="box-x flex-1 js gap-8">
          <!-- <div class="box-x gap2">
          </div> -->
          <!-- <RouterLink :to="{ name: 'home' }" class="">Акции</RouterLink> -->
          <RouterLinkCatalog :type_id="1" :type_name="`entrance-doors`"
            >входные двери</RouterLinkCatalog
          >
          <RouterLinkCatalog :type_id="2" :type_name="`interior-doors`"
            >межкомнотные двери</RouterLinkCatalog
          >
          <!-- <RouterLink :to="{ name: 'home' }" class="">фурнитура</RouterLink> -->
          <!-- <RouterLink :to="{ name: 'home' }" class="">напольные покрытия</RouterLink> -->
          <!-- <RouterLink :to="{ name: 'home' }" class="">мебель</RouterLink> -->
          <RouterLinkCatalog :type_id="3" :type_name="`kitchens`">кухни</RouterLinkCatalog>
        </div>

        <!-- <LayoutPopup :css_class="'absolute top-8'" class="box-x">
          <template #button>
            <span>прочее</span>
          </template>
          <template #content="{ change_selected_option }">
            <div class="box-y font-normal c-sub">
              <RouterLinkCatalog
                @click="change_selected_option"
                class="select__item px-8 py-2"
                :type_id="1"
                :type_name="`entrance-doors`"
                >входные двери</RouterLinkCatalog
              >
              <RouterLinkCatalog
                @click="change_selected_option"
                class="select__item px-8 py-2"
                :type_id="2"
                :type_name="`interior-doors`"
                >межкомнотные двери</RouterLinkCatalog
              >
            </div>
          </template>
        </LayoutPopup> -->

        <!-- <img class="h-6" src="@/assets/icons/search.svg" alt="search" /> -->
        <!-- <img class="h-6" src="@/assets/icons/favorite.svg" alt="favorite" /> -->
        <RouterLink
          :to="{
            name: 'cart',
          }"
        >
          <img class="h-6" src="@/assets/icons/shopping.svg" alt="shopping" />
        </RouterLink>
        <!-- <img class="h-6" src="@/assets/icons/bar_chart.svg" alt="bar_chart" /> -->
      </div>
    </LayoutWrapper>
  </div>
</template>

<style lang="sass" scoped>
//
.select
  &__item
    &:hover
      background-color: $sub-95
.product-nav
  +g
</style>
