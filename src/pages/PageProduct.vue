<script setup lang="ts">
import { product } from '@/api/api'
import ComponentBread from '@/components/ComponentBread.vue'
import SectionProduct from '@/components/sections/SectionProduct.vue'
import FooterMain from '@/layout/footer/FooterMain.vue'
import LayoutPage from '@/layout/LayoutPage.vue'
import LayoutWrapper from '@/layout/LayoutWrapper.vue'
import { up_fast } from '@/utilte/utilte'
import { onMounted } from 'vue'
import { RouteLocationNormalizedGeneric } from 'vue-router'

onMounted(async () => {
  up_fast()
})

async function init(route: RouteLocationNormalizedGeneric) {
  if (route.params.id) product.product.init(Number(route.params.id))
}
</script>

<template>
  <LayoutPage :foo="init" class="main box-y gap-16">
    <LayoutWrapper class="box-y gap-12">
      <ComponentBread />
      <SectionProduct />
    </LayoutWrapper>
  </LayoutPage>
  <FooterMain />
</template>

<style lang="sass" scoped></style>
