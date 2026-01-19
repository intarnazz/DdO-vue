<script setup>
import FooterMain from '@/layout/footer/FooterMain.vue'
import LayoutPage from '@/layout/LayoutPage.vue'
import SectionAboutUs from '@/components/sections/SectionAboutUs.vue'
</script>

<template>
  <div class="header-spase"></div>
  <LayoutPage class="main box-y gap4">
    <SectionAboutUs />
    <div class=""></div>
  </LayoutPage>
  <div class="flex"></div>
  <FooterMain />
</template>

<style lang="sass" scoped></style>
