<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import IconRight from '@/components/icons/IconRight.vue'
import { product, type } from '@/api/api'
import { computed } from 'vue'
import RouterLinkCatalog from '@/layout/router-links/RouterLinkCatalog.vue'

const route = useRoute()

const type_visible_name = computed(
  () => product.product.type.visible_name || type.type.visible_name || '',
)
const type_name = computed(() => product.product.type.name || type.type.name || '')
// [ ]: каталог
// [ ]: модели продукта
</script>

<template>
  <div v-if="type_name" class="box-x 2 w js">
    <RouterLink class="c-sub a a_sub" :to="{ name: 'home' }"> Главная </RouterLink>
    <IconRight />
    <RouterLink class="c-sub a a_sub" :to="{ name: 'home' }"> Каталог </RouterLink>
    <IconRight />
    <template v-if="route.name === 'product'">
      <RouterLinkCatalog class="c-sub a a_sub" :type_name="type_name">
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
</template>

<style scoped lang="sass"></style>
