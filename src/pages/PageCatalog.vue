<script setup lang="ts">
import FooterMain from '@/layout/footer/FooterMain.vue'
import LayoutPage from '@/layout/LayoutPage.vue'
import LayoutWrapper from '@/layout/LayoutWrapper.vue'
import SectionCatalog from '@/components/sections/SectionCatalog.vue'
import ComponentBread from '@/components/ComponentBread.vue'
import { filter, type } from '@/api/api'
import { useRoute } from 'vue-router'
import ComponentContext from '@/components/ComponentContext.vue'
import { computed, watch } from 'vue'
import { toNum } from '@/utilte/utilte'
import ComponentLoader from '@/components/ComponentLoader.vue'

const route = useRoute()

const { id } = defineProps<{
  id: string
}>()

const idNum = computed(() => toNum(id))

const init = () => {
  filter.update(route.query)
  if (type.type.id !== idNum.value) type.type.init(idNum.value)
}

// FIXME: страый баг с исинхронными фильтрами

watch(
  () => route.query,
  () => {
    if (idNum.value === type.type.id) filter.update(route.query)
  },
)

watch(
  () => route.params.id,
  () => {
    if (idNum.value === type.type.id) init()
  },
)
</script>

<template>
  <!-- <LayoutPage :foo="init" class="main box-y gap-16"> -->
  <LayoutPage :foo="init" class="main box-y gap-16">
    <LayoutWrapper v-if="idNum === type.type.id" class="box-y gap-12">
      <div class="box-y gap-4">
        <ComponentBread />
        <ComponentContext />
      </div>
      <SectionCatalog v-if="type.type.id" />
    </LayoutWrapper>
    <div v-else class="box-y pt-100">
      <ComponentLoader />
    </div>
  </LayoutPage>
  <FooterMain />
</template>

<style lang="sass" scoped></style>
