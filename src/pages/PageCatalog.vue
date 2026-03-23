<script setup lang="ts">
import FooterMain from '@/layout/footer/FooterMain.vue'
import LayoutPage from '@/layout/LayoutPage.vue'
import LayoutWrapper from '@/layout/LayoutWrapper.vue'
import SectionCatalog from '@/components/sections/SectionCatalog.vue'
import ComponentBread from '@/components/ComponentBread.vue'
import { filter, type } from '@/api/api'
import { RouteLocationNormalizedGeneric } from 'vue-router'

async function init(route: RouteLocationNormalizedGeneric) {
  if (route.query) filter.update(route.query)
  if (route.params.type && route.params.type !== type.type.name)
    await type.type.init(String(route.params.type))
}
</script>

<template>
  <LayoutPage :foo="init" v-slot="{ isLoading }" class="main box-y gap-16">
    <LayoutWrapper class="box-y gap-12">
      <ComponentBread />
      <SectionCatalog v-if="!isLoading" />
    </LayoutWrapper>
  </LayoutPage>
  <FooterMain />
</template>

<style lang="sass" scoped></style>
