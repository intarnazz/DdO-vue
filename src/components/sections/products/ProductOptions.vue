<script setup lang="ts">
import { product } from '@/api/api'
import { Option } from '@/api/local_domains/catalog/product/types'
import ButtonAddToCart from '@/components/buttons/ButtonAddToCart.vue'
import ComponentCount from '@/components/ComponentCount.vue'
import ProductOption from '@/components/domains/product/ProductOption.vue'
import ProductPrice from '@/components/sections/products/ProductPrice.vue'
import { computed, ref } from 'vue'

const total_count = ref(1)

const price = computed(() => {
  let price = 0
  product.product.options.forEach((o) => {
    price += o.count * o.price
  })
  return (price + product.product.price) * total_count.value
})

const set_option_count = (option: Option, number: number) => (option.count = number)
const set_total_count = (number: number) => (total_count.value += number)
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
    <div class="box-x gap-4 as">
      <div class="box-y gap-4">
        <div class="box-x gap-4 js">
          <strong>общее количество:</strong>
          <ComponentCount @set_count="set_total_count" :count="total_count" />
        </div>
        <div class="box-x gap-4 js">
          <strong>общая сумма:</strong>
          <ProductPrice :price="price" />
        </div>
      </div>
      <div class="box-y">
        <div class=""></div>
        <ButtonAddToCart :product="product.product" />
      </div>
    </div>
  </section>
</template>

<style lang="sass" scoped>
strong
  font-size: 1.125rem
</style>
