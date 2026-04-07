<script setup lang="ts">
import FooterMain from '@/layout/footer/FooterMain.vue'
import LayoutPage from '@/layout/LayoutPage.vue'
import SectionHome from '@/components/sections/SectionHome.vue'
// FORGETFOREVER: документация
// FORGETFOREVER: вакансии
</script>

<template>
  <LayoutPage class="main">
    <SectionHome class="w" />
  </LayoutPage>
  <FooterMain />
</template>

<style lang="sass" scoped>
.main
  padding: 0
</style>
