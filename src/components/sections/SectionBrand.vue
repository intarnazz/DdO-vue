<script setup lang="ts">
import { brand as brand_api } from '@/api/api'
import { Brand } from '@/api/api_domains/brand/brand'
import ComponentImg from '@/components/ComponentImg.vue'
import ComponentLoader from '@/components/ComponentLoader.vue'
import RouterLinkCatalog from '@/layout/router-links/RouterLinkCatalog.vue'
import { toNum } from '@/utilte/utilte'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const { brand_id } = defineProps<{
  brand_id?: number
}>()

const route = useRoute()
const brand = ref<Brand | undefined>()

const init = async () => {
  brand.value = undefined
  if (!route.params.id && !brand_id) return
  const res = await brand_api.get(toNum(route.params.id || brand_id))
  if (!res.success) return
  if (res.data) brand.value = new Brand(res.data)
}

onMounted(async () => {
  await init()
})

watch([() => route.params.id, () => brand_id], init)
// TODO: удалить route.params.id
</script>

<template>
  <section v-if="brand" class="brand box-y gap-8 as js">
    <div class="box-x">
      <ComponentImg class="h-25" :storage="brand.image.path" />
    </div>
    <h2>{{ brand.name }}</h2>
    <p>{{ brand.description }}</p>
    <p>{{ brand.text.text }}</p>
    <div class="box-y gap-4">
      <div class="box-x" v-for="type in brand.filter.types" :key="type.id">
        <RouterLinkCatalog
          class="a a_sub"
          :query="{ brand: brand.id }"
          :type_id="type.id"
          :type_name="type.name"
        >
          <span> {{ type.visible_name }} бренда {{ brand.name }} </span>
        </RouterLinkCatalog>
      </div>
    </div>
  </section>
  <div v-else-if="route.params.id || brand_id" class="center">
    <ComponentLoader />
  </div>
  <div class="box-y gap-8 p-4 br border" v-else>
    <h2 class="c-sub">выберите бренд</h2>
  </div>
</template>

<style lang="sass" scoped></style>
