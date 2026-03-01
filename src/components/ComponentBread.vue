<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import IconRight from '@/components/icons/IconRight.vue'
import { product, type } from '@/api/api'

const router = useRoute()
</script>

<template>
  <div class="box-x 2 w js">
    <RouterLink class="c-sub a" :to="{ name: 'home' }"> Главная </RouterLink>
    <IconRight />
    <RouterLink class="c-sub a" :to="{ name: 'home' }"> Каталог </RouterLink>
    <IconRight />
    <template v-if="router.name === 'product'">
      <RouterLink
        :to="{
          name: 'catalog',
          params: {
            type: type.type.name,
          },
        }"
        class="c-sub a"
        >{{ type.type.visible_name }}
      </RouterLink>
      <IconRight />
      <RouterLink class="c-sub a" :to="{ name: 'home' }">
        {{ product.product.variant.name }}
      </RouterLink>
      <IconRight />
      <p class="c-sub">{{ product.product.name }}</p>
    </template>
    <p v-else class="c-sub">{{ type.type.visible_name }}</p>
  </div>
</template>

<style scoped lang="sass"></style>
