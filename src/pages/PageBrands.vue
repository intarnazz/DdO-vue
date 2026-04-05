<script setup lang="ts">
import { brand } from '@/api/api'
import ComponentBread from '@/components/ComponentBread.vue'
import ComponentContext from '@/components/ComponentContext.vue'
import ComponentLoader from '@/components/ComponentLoader.vue'
import FooterMain from '@/layout/footer/FooterMain.vue'
import LayoutPage from '@/layout/LayoutPage.vue'
import LayoutWrapper from '@/layout/LayoutWrapper.vue'

const init = async () => await brand.all()
</script>

<template>
  <LayoutPage v-slot="{ promise: brands, isLoading }" :foo="init" class="main box-y gap-16">
    <LayoutWrapper v-if="!isLoading" class="box-y gap-16">
      <div class="box-y gap-4">
        <ComponentBread />
        <ComponentContext />
      </div>

      <h2>brands</h2>
      {{ brands }}

      <!-- <ProductMain />
      <ProductOptions />
      <ProductDescription />
      <ProductSimilarProduct /> -->
    </LayoutWrapper>
    <div v-else class="box-y pt-100">
      <ComponentLoader />
    </div>
  </LayoutPage>
  <FooterMain />
</template>

<style lang="sass" scoped></style>
