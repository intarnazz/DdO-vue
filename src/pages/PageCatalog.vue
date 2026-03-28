<script setup lang="ts">
import FooterMain from '@/layout/footer/FooterMain.vue'
import LayoutPage from '@/layout/LayoutPage.vue'
import LayoutWrapper from '@/layout/LayoutWrapper.vue'
import SectionCatalog from '@/components/sections/SectionCatalog.vue'
import ComponentBread from '@/components/ComponentBread.vue'
import { filter, type } from '@/api/api'
import { useRoute } from 'vue-router'
import ComponentContext from '@/components/ComponentContext.vue'
import { onMounted, watch } from 'vue'

const route = useRoute()

const { type: type_name } = defineProps<{
  type: string
}>()

onMounted(async () => {
  filter.update(route.query)
  if (!type.type.id) await type.type.init(type_name)
})

watch(
  () => route.query,
  () => filter.update(route.query),
)
</script>

<template>
  <!-- <LayoutPage :foo="init" class="main box-y gap-16"> -->
  <LayoutPage class="main box-y gap-16">
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
