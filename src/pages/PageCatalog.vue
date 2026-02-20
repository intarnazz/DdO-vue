<script setup>
import FooterMain from '@/layout/footer/FooterMain.vue'
import LayoutPage from '@/layout/LayoutPage.vue'
import LayoutWrapper from '@/layout/LayoutWrapper.vue'
import SectionCatalog from '@/components/sections/SectionCatalog.vue'
import ComponentBread from '@/components/ComponentBread.vue'
import CatalogProduct from '@/pages/Catalog/CatalogProduct.vue'
import { onMounted, ref } from 'vue'
import { type } from '@/api/api'

const props = defineProps(['type', 'id'])
const is_loading = ref(true)

onMounted(async () => {
  is_loading.value = true
  await type.init(props.type)
  is_loading.value = false
})
</script>

<template>
  <LayoutPage class="main box-y gap4">
    <LayoutWrapper class="box-y gap4">
      <template v-if="!is_loading">
        <ComponentBread />
        <CatalogProduct v-if="props.id" :id="id" />
        <template v-else>
          <SectionCatalog />
        </template>
      </template>
    </LayoutWrapper>
  </LayoutPage>
  <FooterMain />
</template>

<style lang="sass" scoped></style>
