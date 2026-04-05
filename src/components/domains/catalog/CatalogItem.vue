<script setup lang="ts">
import { computed } from 'vue'
import { filter, product as api_product } from '@/api/api'
import { price as toStringPrice } from '@/utilte/utilte'
import ComponentImg from '@/components/ComponentImg.vue'
import ButtonFavorite from '@/components/buttons/ButtonFavorite.vue'
import ComponentHighlightText from '@/components/ComponentHighlightText.vue'
import ButtonComparison from '@/components/buttons/ButtonComparison.vue'
import IconKeyboardArrowUp from '@/components/icons/IconKeyboardArrowUp.vue'
import IconKeyboardArrowDown from '@/components/icons/IconKeyboardArrowDown.vue'
import RouterLinkProduct from '@/layout/router-links/RouterLinkProduct.vue'
import ButtonAddToCart from '@/components/buttons/ButtonAddToCart.vue'
import { ProductType } from '@/api/local_domains/catalog/product'

const { product } = defineProps<{
  product: ProductType
}>()

const price_string = computed(() => toStringPrice(product.price))
const price_discount = computed(() =>
  Math.ceil(product.price - product.price * (product.discount / 100)),
)
const price_discount_string = computed(() => toStringPrice(price_discount.value))
const has_price_discount = computed(() => product.discount > 0)

const is_more = computed<boolean>(() => {
  if (api_product.comparison_product !== null)
    return product.price > api_product.comparison_product.price
  return false
})
const is_less = computed<boolean>(() => {
  if (api_product.comparison_product !== null)
    return product.price < api_product.comparison_product.price
  return false
})
const is_equal = computed<boolean>(() => {
  if (api_product.comparison_product !== null)
    return product.price === api_product.comparison_product.price
  return false
})
</script>

<template>
  <div class="product box-y relative center gap-4">
    <RouterLinkProduct :product="product" class="box-y js">
      <p
        :class="{
          'opacity-0': !Boolean(filter.search),
        }"
        class="c-sub"
      >
        {{ product.article }}
      </p>
      <div class="box-y center gap-4">
        <div class="box-x gap-2 content center">
          <div class="box-x relative h-67.5 max-h-67.5">
            <div
              v-if="has_price_discount"
              class="absolute z-1 top-2 -left-2 px-2 py-1 bg-mark c-w shadow-xl"
            >
              - {{ product.discount }} %
            </div>
            <ComponentImg
              class="product__img object-cover h-full"
              :storage="product.image_primary.path"
            />
          </div>
          <div v-if="product.image_secondary" class="box-x relative h-67.5 max-h-67.5">
            <ComponentImg
              class="product__img object-cover h-full"
              :storage="product.image_secondary.path"
            />
          </div>
        </div>
        <h3>
          <ComponentHighlightText :text="product.name" :search="filter.search" />
        </h3>
        <div class="product__price box-x gap-2">
          <p v-if="has_price_discount" class="px-2 bg-mark c-w">
            {{ price_discount_string }}
          </p>

          <p v-if="is_less">
            <ComponentHighlightText :text="price_string" :search="price_string" />
          </p>
          <p
            v-else
            :class="{
              product__price_del: has_price_discount,
            }"
          >
            {{ price_string }}
          </p>

          <template v-if="api_product.comparison_product !== null">
            <div class="box-y" v-if="is_more">
              <IconKeyboardArrowUp fill="red" />
              <IconKeyboardArrowUp fill="red" />
            </div>
            <div class="box-y" v-if="is_less">
              <IconKeyboardArrowDown fill="green" />
              <IconKeyboardArrowDown fill="green" />
            </div>
            <span class="c-main" v-if="is_equal"> --- </span>
          </template>
        </div>
      </div>
    </RouterLinkProduct>
    <div class="box-x gap">
      <ButtonFavorite :product="product" :is_mini="true" />
      <ButtonComparison :product="product" :is_mini="true" />
      <ButtonAddToCart :product="product" :is_mini="true" />
    </div>
  </div>
</template>

<style lang="sass" scoped>
//
.product
  &__price
    color: $b
    font-weight: 700
    &_del
      +c-sub
      font-weight: 400
      text-decoration: line-through;
  &__img
    box-shadow: 0px 15px 20px 0px $b-50
</style>
