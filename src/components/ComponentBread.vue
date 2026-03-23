<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import IconRight from '@/components/icons/IconRight.vue'
import { product, type } from '@/api/api'
import { computed } from 'vue'
import { price } from '@/utilte/utilte'
import RouterLinkProduct from '@/layout/router-links/RouterLinkProduct.vue'
import IconClose from '@/components/icons/IconClose.vue'
import RouterLinkCatalog from '@/layout/router-links/RouterLinkCatalog.vue'

const router = useRoute()

const type_visible_name = computed(
  () => product.product.type.visible_name || type.type.visible_name || '',
)
const type_name = computed(() => product.product.type.name || type.type.name || '')

function set_comparison_product() {
  product.comparison_product = null
}
</script>

<template>
  <div class="box-y gap-4">
    <div v-if="type_name" class="box-x 2 w js">
      <RouterLink class="c-sub a a_sub" :to="{ name: 'home' }"> Главная </RouterLink>
      <IconRight />
      <RouterLink class="c-sub a a_sub" :to="{ name: 'home' }"> Каталог </RouterLink>
      <IconRight />
      <template v-if="router.name === 'product'">
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
    <div class="">
      <div
        :class="{
          'opacity-0': !product.comparison_product,
        }"
        class="c-sub box-x js gap-1"
      >
        <p>
          данные в сравнении с:
          <template v-if="product.comparison_product">
            <RouterLinkProduct :product="product.comparison_product" class="c-sub a a_sub">{{
              product.comparison_product.name
            }}</RouterLinkProduct>
            /
            {{ price(product.comparison_product.price) }}
            /
          </template>
        </p>
        <button @click="set_comparison_product">
          <IconClose />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass"></style>
