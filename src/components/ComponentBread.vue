<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import IconRight from '@/components/icons/IconRight.vue'
import { filter, product, type } from '@/api/api'
import { computed } from 'vue'

const router = useRoute()

const type_visible_name = computed(
  () => product.product.type.visible_name || type.type.visible_name || '',
)
const type_name = computed(() => product.product.type.name || type.type.name || '')
</script>

<template>
  <div v-if="type_name" class="box-x 2 w js">
    <RouterLink class="c-sub a a_sub" :to="{ name: 'home' }"> Главная </RouterLink>
    <IconRight />
    <RouterLink class="c-sub a a_sub" :to="{ name: 'home' }"> Каталог </RouterLink>
    <IconRight />
    <template v-if="router.name === 'product'">
      <RouterLink
        class="c-sub a a_sub"
        :to="{
          name: 'catalog',
          params: { type: type_name },
          query: filter.query,
        }"
      >
        {{ type_visible_name }}
      </RouterLink>
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
