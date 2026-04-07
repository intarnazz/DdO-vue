<script setup lang="ts">
import { brand as brand_api } from '@/api/api'
import { Brand } from '@/api/api_domains/brand'
import ComponentLoader from '@/components/ComponentLoader.vue'
import { toNum } from '@/utilte/utilte'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const brand = ref<Brand>()

const init = async () => {
  if (!route.params.id) return
  const res = await brand_api.get(toNum(route.params.id))
  if (!res.success) return
  if (res.data) brand.value = new Brand(res.data)
}

onMounted(async () => {
  await init()
})

watch(() => route.params.id, init)
</script>

<template>
  <section v-if="brand" class="brand box-y gap-8 as js">
    <h2>{{ brand.name }}</h2>
    <p>{{ brand.description }}</p>
    <p>{{ brand.text.text }}</p>
  </section>
  <div v-else-if="route.params.id" class="center">
    <ComponentLoader />
  </div>
  <div class="box-y gap-8 p-4 br border" v-else>
    <h2 class="c-sub">выберите бренд</h2>
  </div>
</template>

<style lang="sass" scoped></style>
