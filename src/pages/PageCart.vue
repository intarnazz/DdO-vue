<script setup lang="ts">
import ComponentBread from '@/components/ComponentBread.vue'
import SectionCart from '@/components/sections/SectionCart.vue'
import FooterMain from '@/layout/footer/FooterMain.vue'
import LayoutPage from '@/layout/LayoutPage.vue'
import LayoutWrapper from '@/layout/LayoutWrapper.vue'
</script>

<template>
  <LayoutPage class="main w">
    <LayoutWrapper class="box-y gap-16">
      <div class="box-y flex gap-4">
        <ComponentBread />
      </div>
      <SectionCart />
    </LayoutWrapper>
  </LayoutPage>
  <FooterMain />
</template>

<style lang="sass" scoped></style>
