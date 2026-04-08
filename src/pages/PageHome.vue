<script setup lang="ts">
import FooterMain from '@/layout/footer/FooterMain.vue'
import LayoutPage from '@/layout/LayoutPage.vue'
import SectionHome from '@/components/sections/SectionHome.vue'
import LayoutWrapper from '@/layout/LayoutWrapper.vue'
import HomeCatalog from '@/components/sections/home/HomeCatalog.vue'
// FORGETFOREVER: документация
// FORGETFOREVER: вакансии
</script>

<template>
  <LayoutPage class="main">
    <SectionHome class="w" />
    <LayoutWrapper>
      <HomeCatalog />
    </LayoutWrapper>
  </LayoutPage>
  <FooterMain />
</template>

<style lang="sass" scoped>
.main
  padding: 0
</style>
