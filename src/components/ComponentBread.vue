<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import IconRight from '@/components/icons/IconRight.vue'
import { product, type } from '@/api/api'
import { Ref, ref, watch } from 'vue'
import RouterLinkCatalog from '@/layout/router-links/RouterLinkCatalog.vue'
import ButtonGoBack from '@/components/buttons/ButtonGoBack.vue'

const route = useRoute()

const type_name: Ref<string> = ref(product.product.type.name || type.type.name || '')
const type_id: Ref<number> = ref(product.product.type.id || type.type.id || 1)
const type_visible_name: Ref<string> = ref(
  product.product.type.visible_name || type.type.visible_name || '',
)
// [ ]: каталог

const set_type_name = (new_type_name: string | null | undefined) => {
  if (new_type_name) type_name.value = new_type_name
}

const set_type_visible_name = (new_type_visible_name: string | null | undefined) => {
  if (new_type_visible_name) type_visible_name.value = new_type_visible_name
}

watch(
  () => product.product.type.name,
  (n) => set_type_name(n),
)

watch(
  () => type.type.name,
  (n) => set_type_name(n),
)

watch(
  () => product.product.type.visible_name,
  (n) => set_type_visible_name(n),
)

watch(
  () => type.type.visible_name,
  (n) => set_type_visible_name(n),
)
// FIXME: сыллка на модель
</script>

<template>
  <div v-if="type_name" class="box-x 2 w js gap-2">
    <p class="box-x gap-2"><ButtonGoBack /> <span class="c-main">///</span></p>
    <div class="box-x 2 flex js">
      <RouterLink class="c-sub a a_sub" :to="{ name: 'home' }"> Главная </RouterLink>
      <IconRight />
      <RouterLink class="c-sub a a_sub" :to="{ name: 'home' }"> Каталог </RouterLink>
      <IconRight />
      <template v-if="route.name === 'product'">
        <RouterLinkCatalog class="c-sub a a_sub" :type_id="type_id" :type_name="type_name">
          {{ type_visible_name }}
        </RouterLinkCatalog>
        <IconRight />
        <RouterLink class="c-sub a a_sub" :to="{ name: 'home' }">
          {{ product.product.variant.name }}
        </RouterLink>
        <IconRight />
        <p class="c-sub">{{ product.product.name }}</p>
      </template>
      <p v-else class="c-sub">{{ type_visible_name }}</p>
    </div>
  </div>
</template>

<style scoped lang="sass"></style>
