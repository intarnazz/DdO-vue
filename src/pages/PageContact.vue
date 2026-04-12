<script setup lang="ts">
import SectionContact from '@/components/sections/SectionContact.vue'
import FooterMain from '@/layout/footer/FooterMain.vue'
import LayoutPage from '@/layout/LayoutPage.vue'
</script>

<template>
  <LayoutPage class="main w box-y">
    <SectionContact class="flex" />
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
