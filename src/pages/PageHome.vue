<script setup lang="ts">
import FooterMain from '@/layout/footer/FooterMain.vue'
import LayoutPage from '@/layout/LayoutPage.vue'
import SectionHome from '@/components/sections/SectionHome.vue'
import HomeCatalog from '@/components/sections/home/HomeCatalog.vue'
// import HomeBrands from '@/components/sections/home/HomeBrands.vue'
import LayoutWrapper from '@/layout/LayoutWrapper.vue'
import HomeVideo from '@/components/sections/home/HomeVideo.vue'
import HomeContacts from '@/components/sections/home/HomeContacts.vue'
// [ ]: документация
// [ ]: вакансии
</script>

<template>
  <LayoutPage class="main w">
    <SectionHome class="w" />
    <div class="box-y w catalog__list">
      <HomeCatalog class="catalog__item border w pt-4 pb-16 -mt-px" :type_id="1" />
      <HomeCatalog
        :grid_template_columns="5"
        :limit="5"
        class="catalog__item border w pt-4 pb-16 -mt-px"
        :type_id="2"
      />
    </div>
    <HomeVideo />
    <!-- <HomeCatalog class="catalog__item border w pt-4 pb-16 -mt-px" :type_id="3" /> -->
    <!-- <HomeBrands /> -->
    <LayoutWrapper>
      <HomeContacts />
    </LayoutWrapper>
  </LayoutPage>
  <FooterMain class="mt-16" />
</template>

<style lang="sass" scoped>
.main
  padding: 0

.catalog
  &__item
    &:last-child
      padding-bottom: 0
    &:first-child
      border-top: none
    &:last-child
      border: none
</style>
