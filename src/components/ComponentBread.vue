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
const type_visible_name: Ref<string> = ref(product.product.type.name || type.type.name || '')
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
  () => product.product.type.name,
  (n) => set_type_visible_name(n),
)

watch(
  () => type.type.name,
  (n) => set_type_visible_name(n),
)
</script>

<template>
  <div class="flex items-start 2 w gap-2">
    <p class="box-x gap-2"><ButtonGoBack /> <span class="c-main">///</span></p>
    <div class="box-x flex-wrap 2 flex-1 js">
      <RouterLink class="a a_sub" :to="{ name: 'home' }"> Главная </RouterLink>
      <IconRight />
      <template v-if="route.name === 'cart'">
        <p>ваша корзина</p>
      </template>
      <template v-else-if="route.name === 'about-us'">
        <p>о нас</p>
      </template>
      <template v-else-if="route.name === 'brands'">
        <p>бренды</p>
      </template>
      <template v-else-if="route.name === 'brand'">
        <p>бренды</p>
        <IconRight />
        <p>{{ route.params.name }}</p>
      </template>
      <template v-else>
        <RouterLink class="a a_sub" :to="{ name: 'home' }"> Каталог </RouterLink>
        <IconRight />
        <template v-if="route.name === 'product'">
          <RouterLinkCatalog class="a a_sub" :type_id="type_id" :type_name="type_name">
            {{ type_visible_name }}
          </RouterLinkCatalog>
          <IconRight />
          <RouterLinkCatalog
            class="a a_sub"
            :type_id="product.product.type.id"
            :type_name="product.product.type.name"
            :query="{
              variant: product.product.variant.id,
            }"
          >
            {{ product.product.variant.name }}
          </RouterLinkCatalog>
          <IconRight />
          <p class="">{{ product.product.name }}</p>
        </template>
        <p v-else>{{ type_visible_name }}</p>
      </template>
    </div>
  </div>
</template>

<style scoped lang="sass">
p,
a
  +c-sub
</style>
