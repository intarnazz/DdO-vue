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
  type.type.id = idNum.value
}

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
    <LayoutWrapper class="box-y gap-12">
      <div class="box-y gap-4">
        <ComponentBread />
        <ComponentContext />
      </div>
      <div v-if="type.type.is_loading" class="box-y pt-100">
        <ComponentLoader />
      </div>
      <SectionCatalog v-else-if="type.type.id" />
    </LayoutWrapper>
  </LayoutPage>
  <FooterMain />
</template>

<style lang="sass" scoped></style>
