<script setup lang="ts">
import ComponentBread from '@/components/ComponentBread.vue'
import SectionProduct from '@/components/sections/SectionProduct.vue'
import FooterMain from '@/layout/footer/FooterMain.vue'
import LayoutPage from '@/layout/LayoutPage.vue'
import LayoutWrapper from '@/layout/LayoutWrapper.vue'
import { up_fast } from '@/utilte/utilte'
import { onMounted } from 'vue'

onMounted(async () => {
  up_fast()
})
</script>

<template>
  <LayoutPage class="main box-y gap-16">
    <LayoutWrapper class="box-y gap-12">
      <ComponentBread />
      <SectionProduct />
    </LayoutWrapper>
  </LayoutPage>
  <FooterMain />
</template>

<style lang="sass" scoped></style>
