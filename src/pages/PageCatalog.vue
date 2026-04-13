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

const init = async () => {
  filter.update(route.query)
  if (type.type.id !== idNum.value) await type.type.init(idNum.value)
}

watch(
  () => route.query,
  () => filter.update(route.query),
)

watch(
  () => route.params.id,
  () => init(),
)
// LARAVEL: опроверить выдаёт ли сервер новиники или фильтрует по обновлениям
</script>

<template>
  <!-- <LayoutPage :foo="init" class="main box-y gap-16"> -->
  <LayoutPage v-slot="{ isLoading }" :foo="init" class="main box-y gap-16">
    <LayoutWrapper v-if="!isLoading && idNum === type.type.id" class="box-y gap-12">
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
