<script setup>
import FooterMain from '@/layout/footer/FooterMain.vue'
import LayoutPage from '@/layout/LayoutPage.vue'
import LayoutWrapper from '@/layout/LayoutWrapper.vue'
import SectionCatalog from '@/components/sections/SectionCatalog.vue'
import ComponentBread from '@/components/ComponentBread.vue'
import CatalogProduct from '@/pages/Catalog/CatalogProduct.vue'

const props = defineProps(['type', 'id', 'model'])
</script>

<template>
  <LayoutPage class="main box-y gap4">
    <LayoutWrapper class="box-y gap4">
      <ComponentBread :type="props.type" :id="props.id" :model="props.model" />
      <CatalogProduct v-if="props.id" :id="id" />
      <template v-else>
        <SectionCatalog />
      </template>
    </LayoutWrapper>
  </LayoutPage>
  <FooterMain />
</template>

<style lang="sass" scoped></style>
