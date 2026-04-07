<script setup lang="ts">
import ComponentBread from '@/components/ComponentBread.vue'
import ComponentContext from '@/components/ComponentContext.vue'
import SectionBrand from '@/components/sections/SectionBrand.vue'
import SectionBrands from '@/components/sections/SectionBrands.vue'
import FooterMain from '@/layout/footer/FooterMain.vue'
import LayoutPage from '@/layout/LayoutPage.vue'
import LayoutWrapper from '@/layout/LayoutWrapper.vue'
</script>

<template>
  <LayoutPage class="main box-y gap-16">
    <LayoutWrapper class="box-y gap-16">
      <div class="box-y flex gap-4">
        <ComponentBread />
        <ComponentContext />
      </div>
      <div class="box-x as gap-8">
        <SectionBrands />
        <SectionBrand class="flex" />
      </div>
    </LayoutWrapper>
  </LayoutPage>
  <FooterMain />
</template>

<style lang="sass" scoped></style>
