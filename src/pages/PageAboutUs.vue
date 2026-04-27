<script setup lang="ts">
import FooterMain from '@/layout/footer/FooterMain.vue'
import LayoutPage from '@/layout/LayoutPage.vue'
import LayoutWrapper from '@/layout/LayoutWrapper.vue'
import ComponentBread from '@/components/ComponentBread.vue'
import ComponentContext from '@/components/ComponentContext.vue'
import AboutUsMain from '@/components/sections/about-us/AboutUsMain.vue'
</script>

<template>
  <LayoutPage class="main box-y gap-16">
    <LayoutWrapper class="box-y gap-12">
      <div class="box-y gap-4">
        <ComponentBread />
        <ComponentContext />
      </div>
      <AboutUsMain />
      <!-- <AboutUsPaymentAndDelivery /> -->
    </LayoutWrapper>
  </LayoutPage>
  <FooterMain />
</template>

<style lang="sass" scoped></style>
