<script setup lang="ts">
import FooterMain from '@/layout/footer/FooterMain.vue'
import LayoutPage from '@/layout/LayoutPage.vue'
import LayoutWrapper from '@/layout/LayoutWrapper.vue'
import SectionCatalog from '@/components/sections/SectionCatalog.vue'
import ComponentBread from '@/components/ComponentBread.vue'
import { filter, type } from '@/api/api'
import { RouteLocationNormalizedGeneric, useRoute } from 'vue-router'
import ComponentContext from '@/components/ComponentContext.vue'
import { computed, watch } from 'vue'

const route = useRoute()

const queryIsUpdate = computed(() => JSON.stringify(route.query) !== JSON.stringify(filter.query))

async function init(route: RouteLocationNormalizedGeneric) {
  if (queryIsUpdate.value)
    filter.update(
      Object.fromEntries(
        Object.entries(route.query).map(([k, v]) => [k, Array.isArray(v) ? v[0] : v]),
      ),
    )
  if (route.params.type && route.params.type !== type.type.name)
    await type.type.init(String(route.params.type))
}

watch(
  () => route.query,
  () => {
    if (!queryIsUpdate.value) return
    init(route)
  },
)
</script>

<template>
  <LayoutPage :foo="init" class="main box-y gap-16">
    <LayoutWrapper class="box-y gap-12">
      <div class="box-y gap-4">
        <ComponentBread />
        <ComponentContext />
      </div>
      <SectionCatalog v-if="type.type.id" />
    </LayoutWrapper>
  </LayoutPage>
  <FooterMain />
</template>

<style lang="sass" scoped></style>
