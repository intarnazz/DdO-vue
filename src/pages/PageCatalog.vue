<script setup lang="ts">
import FooterMain from '@/layout/footer/FooterMain.vue'
import LayoutPage from '@/layout/LayoutPage.vue'
import LayoutWrapper from '@/layout/LayoutWrapper.vue'
import SectionCatalog from '@/components/sections/SectionCatalog.vue'
import ComponentBread from '@/components/ComponentBread.vue'
import { filter, type } from '@/api/api'
import { RouteLocationNormalizedGeneric, useRoute } from 'vue-router'
import ComponentContext from '@/components/ComponentContext.vue'
import { watch } from 'vue'

const route = useRoute()

async function init(route: RouteLocationNormalizedGeneric) {
  const query = Object.fromEntries(
    Object.entries(route.query).map(([k, v]) => [k, Array.isArray(v) ? v[0] : v]),
  )
  if (route.query) filter.update(query)
  if (route.params.type && route.params.type !== type.type.name)
    await type.type.init(String(route.params.type))
}

watch(
  () => route.query,
  (n) => {
    if (JSON.stringify(n) === JSON.stringify(filter.query)) return
    init(route)
  },
)
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
