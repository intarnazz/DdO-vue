<script setup>
import FooterMain from '@/layout/footer/FooterMain.vue'
import LayoutPage from '@/layout/LayoutPage.vue'
import LayoutWrapper from '@/layout/LayoutWrapper.vue'
// import SectionAboutUs from '@/components/sections/SectionAboutUs.vue'
import ComponentBread from '@/components/ComponentBread.vue'
</script>

<template>
  <LayoutPage class="main box-y gap4">
    <LayoutWrapper class="box-y gap4">
      <ComponentBread />
      <h1>Catalog</h1>
      <!-- <SectionAboutUs /> -->
    </LayoutWrapper>
  </LayoutPage>
  <FooterMain />
</template>

<style lang="sass" scoped></style>
