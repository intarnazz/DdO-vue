<script setup lang="ts">
import SectionContacts from '@/components/sections/SectionContacts.vue'
import FooterMain from '@/layout/footer/FooterMain.vue'
import LayoutPage from '@/layout/LayoutPage.vue'
</script>

<template>
  <LayoutPage class="main w box-y">
    <SectionContacts class="flex" />
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
