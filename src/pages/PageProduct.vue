<script setup lang="ts">
import { product } from '@/api/api'
import ComponentBread from '@/components/ComponentBread.vue'
import ComponentContext from '@/components/ComponentContext.vue'
import ProductDescription from '@/components/sections/products/ProductDescription.vue'
import ProductMain from '@/components/sections/products/ProductMain.vue'
import ProductOptions from '@/components/sections/products/ProductOptions.vue'
import ProductSimilarProduct from '@/components/sections/products/ProductSimilarProduct.vue'
import FooterMain from '@/layout/footer/FooterMain.vue'
import LayoutPage from '@/layout/LayoutPage.vue'
import LayoutWrapper from '@/layout/LayoutWrapper.vue'
import { RouteLocationNormalizedGeneric } from 'vue-router'

async function init(route: RouteLocationNormalizedGeneric) {
  if (route.params.id) product.product.init(Number(route.params.id))
}
</script>

<template>
  <LayoutPage :foo="init" class="main box-y gap-16">
    <LayoutWrapper class="box-y gap-16">
      <div class="box-y gap-4">
        <ComponentBread />
        <ComponentContext />
      </div>
      <ProductMain />
      <ProductOptions />
      <ProductDescription />
      <ProductSimilarProduct />
    </LayoutWrapper>
  </LayoutPage>
  <FooterMain />
</template>

<style lang="sass" scoped></style>
