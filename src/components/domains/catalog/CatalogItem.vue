<script setup lang="ts">
import { computed } from 'vue'
import { product as api_product } from '@/api/api'
import ComponentImg from '@/components/ComponentImg.vue'
import ButtonFavorite from '@/components/buttons/ButtonFavorite.vue'
import ComponentHighlightText from '@/components/ComponentHighlightText.vue'
import ButtonComparison from '@/components/buttons/ButtonComparison.vue'
import IconKeyboardArrowUp from '@/components/icons/IconKeyboardArrowUp.vue'
import IconKeyboardArrowDown from '@/components/icons/IconKeyboardArrowDown.vue'
import RouterLinkProduct from '@/layout/router-links/RouterLinkProduct.vue'
import ButtonAddToCart from '@/components/buttons/ButtonAddToCart.vue'
import { ProductType } from '@/api/local_domains/catalog/product'
import ProductDiscount from '@/components/domains/product/ProductDiscount.vue'
import { DefaultTypeInterface } from '@/api/local_domains/catalog/type/type'
import { Query } from '@/api/local_domains/query'

const { product, type, filter } = defineProps<{
  product: ProductType
  type?: DefaultTypeInterface
  filter?: Query
}>()

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

// TOOD: hover
</script>

<template>
  <div class="product box-y relative center gap-2">
    <RouterLinkProduct
      :product="product"
      :type="type"
      class="product__item px-4 pb-2 pt-0 box-y js"
    >
      <p
        :class="{
          'opacity-0': !filter || !Boolean(filter.search),
        }"
        class="c-sub"
      >
        {{ product.article }}
      </p>
      <div class="box-y center gap-4">
        <div class="box-x gap-2 content center">
          <div class="box-x relative h-67.5 max-h-67.5">
            <ProductDiscount :product="product" />

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
        <h3 class="text-center line-clamp-2 min-h-12">
          <ComponentHighlightText v-if="filter" :text="product.name" :search="filter.search" />
          <template v-else> {{ product.name }}</template>
        </h3>
        <div class="product__price box-x gap-2">
          <p v-if="product.has_price_discount" class="px-2 bg-mark c-w">
            {{ product.price_discount_string }}
          </p>

          <p v-if="is_less">
            <ComponentHighlightText :text="product.price_string" :search="product.price_string" />
          </p>
          <p
            v-else
            :class="{
              product__price_del: product.has_price_discount,
            }"
          >
            {{ product.price_string }}
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
  &__item
    +w
    +br
    &:hover
      +bgc-sub
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
