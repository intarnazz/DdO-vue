<script setup lang="ts">
import { computed } from 'vue'
import { filter, product as api_product } from '@/api/api'
import { price as utilte_price } from '@/utilte/utilte'
import ComponentImg from '@/components/ComponentImg.vue'
import ButtonFavorite from '@/components/buttons/ButtonFavorite.vue'
import ComponentHighlightText from '@/components/ComponentHighlightText.vue'
import ButtonComparison from '@/components/buttons/ButtonComparison.vue'
import IconKeyboardArrowUp from '@/components/icons/IconKeyboardArrowUp.vue'
import IconKeyboardArrowDown from '@/components/icons/IconKeyboardArrowDown.vue'
import RouterLinkProduct from '@/layout/router-links/RouterLinkProduct.vue'
import ButtonAddToCart from '@/components/buttons/ButtonAddToCart.vue'
import { ProductType } from '@/api/local_domains/catalog/product'

const props = defineProps<{
  product: ProductType
}>()

const product = computed(() => props.product)
const price = computed(() => utilte_price(product.value.price))

const is_more = computed<boolean>(() => {
  if (api_product.comparison_product !== null)
    return product.value.price > api_product.comparison_product.price
  return false
})
const is_less = computed<boolean>(() => {
  if (api_product.comparison_product !== null)
    return product.value.price < api_product.comparison_product.price
  return false
})
const is_equal = computed<boolean>(() => {
  if (api_product.comparison_product !== null)
    return product.value.price === api_product.comparison_product.price
  return false
})

// TODO: выделять alt-тег при полном совпадении
// [ ]: скидки
</script>

<template>
  <div class="catalog__item box-y center gap-4">
    <RouterLinkProduct :product="product" class="box-y center gap-4">
      <div class="box-x gap-2 content center">
        <div class="box-x relative h-67.5 max-h-67.5">
          <ComponentImg
            class="catalog__img object-cover h-full w-full"
            :storage="product.image_primary.path"
          />
        </div>
        <div class="box-x relative h-67.5 max-h-67.5">
          <ComponentImg
            class="catalog__img object-cover h-full w-full"
            :storage="product.image_secondary.path"
          />
        </div>
      </div>
      <h3>
        <ComponentHighlightText :text="product.name" :search="filter.search" />
      </h3>
      <div class="catalog__price box-x gap-2">
        <p v-if="is_less">
          <ComponentHighlightText :text="price" :search="price" />
        </p>
        <p v-else>
          {{ price }}
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
.catalog
  &__price
    color: $b
    font-weight: 700
    font-family: 'Noto Sans'
  &__img
    box-shadow: 0px 15px 20px 0px $b-50
</style>
