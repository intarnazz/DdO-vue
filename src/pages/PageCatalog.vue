<script setup>
import FooterMain from '@/layout/footer/FooterMain.vue'
import LayoutPage from '@/layout/LayoutPage.vue'
import LayoutWrapper from '@/layout/LayoutWrapper.vue'
import SectionCatalog from '@/components/sections/SectionCatalog.vue'
import ComponentBread from '@/components/ComponentBread.vue'
import { onMounted, ref } from 'vue'
import { type } from '@/api/api'

const props = defineProps(['type'])
const isLoading = ref(true)

onMounted(async () => {
  isLoading.value = true
  await type.init(props.type)
  isLoading.value = false
})
</script>

<template>
  <LayoutPage class="main box-y gap4">
    <LayoutWrapper class="box-y gap4">
      <template v-if="!isLoading">
        <ComponentBread :type="type" />
        <SectionCatalog :type="type" />
      </template>
    </LayoutWrapper>
  </LayoutPage>
  <FooterMain />
</template>

<style lang="sass" scoped></style>
