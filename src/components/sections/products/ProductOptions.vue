<script setup lang="ts">
import { product } from '@/api/api'
import { Option } from '@/api/local_domains/catalog/product/types'
import ButtonAddToCart from '@/components/buttons/ButtonAddToCart.vue'
import ProductOption from '@/components/domains/product/ProductOption.vue'

const set_option_count = (option: Option, number: number) => (option.count = number)
</script>

<template>
  <section class="option box-y gap-8">
    <h2>Обрамление</h2>

    <p class="c-sub">
      donec volutpat turpis tellus, a pretium velit semper nec. Quisque sed egestas tortor.
    </p>

    <div class="option__list box-y gap-2">
      <ProductOption
        @set_option_count="(value) => set_option_count(option, value)"
        v-for="option in product.product.options"
        :key="option.id"
        :option="option"
      />
    </div>

    <ButtonAddToCart :product="product.product" />
  </section>
</template>

<style lang="sass" scoped></style>
