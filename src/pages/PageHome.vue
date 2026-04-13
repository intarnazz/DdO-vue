<script setup lang="ts">
import FooterMain from '@/layout/footer/FooterMain.vue'
import LayoutPage from '@/layout/LayoutPage.vue'
import SectionHome from '@/components/sections/SectionHome.vue'
import HomeCatalog from '@/components/sections/home/HomeCatalog.vue'
import HomeBrands from '@/components/sections/home/HomeBrands.vue'
import SectionContacts from '@/components/sections/SectionContacts.vue'
// [ ]: документация
// [ ]: вакансии
// TODO: лодер на секциях
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
      <HomeCatalog class="catalog__item border w pt-4 pb-16 -mt-px" :type_id="3" />
    </div>
    <HomeBrands />
    <SectionContacts class="flex overflow-hidden" />
  </LayoutPage>
  <FooterMain />
</template>

<style lang="sass" scoped>
.main
  padding: 0

.catalog
  &__item
    &:first-child,
    &:last-child
      border: none
</style>
