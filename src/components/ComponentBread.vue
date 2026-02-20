<script setup lang="ts">
import { RouterLink } from 'vue-router'
import IconRight from '@/components/icons/IconRight.vue'
import { product, type } from '@/api/api'
</script>

<template>
  <div class="box-x 2 w">
    <RouterLink class="c-sub a" :to="{ name: 'home' }"> Главная </RouterLink>
    <IconRight />
    <RouterLink class="c-sub a" :to="{ name: 'home' }"> Каталог </RouterLink>
    <IconRight />
    <template v-if="product.product.name">
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
      <p class="c-sub">{{ product.product.name }}</p>
    </template>
    <p v-else class="c-sub">{{ type.type.visible_name }}</p>

    <div class="flex"></div>
  </div>
</template>

<style scoped lang="sass"></style>
