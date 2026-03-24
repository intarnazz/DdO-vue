<script setup lang="ts">
import FooterMain from '@/layout/footer/FooterMain.vue'
import LayoutPage from '@/layout/LayoutPage.vue'
import LayoutWrapper from '@/layout/LayoutWrapper.vue'
import SectionCatalog from '@/components/sections/SectionCatalog.vue'
import ComponentBread from '@/components/ComponentBread.vue'
import { filter, type } from '@/api/api'
import { RouteLocationNormalizedGeneric } from 'vue-router'
import ComponentContext from '@/components/ComponentContext.vue'
import { objectFilter } from '@/utilte/utilte'

async function init(route: RouteLocationNormalizedGeneric) {
  const query = objectFilter(route.query, (_, value) => Array.isArray(value)) as Record<
    string,
    string
  >
  if (route.query) filter.update(query)
  if (route.params.type && route.params.type !== type.type.name)
    await type.type.init(String(route.params.type))
}
</script>

<template>
  <LayoutPage :foo="init" v-slot="{ isLoading }" class="main box-y gap-16">
    <LayoutWrapper class="box-y gap-12">
      <div class="box-y gap-4">
        <ComponentBread />
        <ComponentContext />
      </div>
      <SectionCatalog v-if="!isLoading" />
    </LayoutWrapper>
  </LayoutPage>
  <FooterMain />
</template>

<style lang="sass" scoped></style>
