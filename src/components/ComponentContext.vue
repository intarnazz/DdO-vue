<script setup lang="ts">
import { product } from '@/api/api'
import { price } from '@/utilte/utilte'
import RouterLinkProduct from '@/layout/router-links/RouterLinkProduct.vue'
import IconClose from '@/components/icons/IconClose.vue'

function set_comparison_product() {
  product.comparison_product = null
}
// [ ]:сбросить между фильтрами
</script>

<template>
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
</template>

<style scoped lang="sass"></style>
