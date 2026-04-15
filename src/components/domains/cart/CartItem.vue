<script setup lang="ts">
import ComponentImg from '@/components/ComponentImg.vue'
import ButtonFavorite from '@/components/buttons/ButtonFavorite.vue'
import ButtonComparison from '@/components/buttons/ButtonComparison.vue'
import RouterLinkProduct from '@/layout/router-links/RouterLinkProduct.vue'
import ButtonAddToCart from '@/components/buttons/ButtonAddToCart.vue'
import { ProductType } from '@/api/local_domains/catalog/product'
import ProductDiscount from '@/components/domains/product/ProductDiscount.vue'

const { product } = defineProps<{
  product: ProductType
}>()
</script>

<template>
  <div class="product border-top bg-white box-x as shadow-xl">
    <RouterLinkProduct :product="product" class="box-x gap-2 content center">
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
    </RouterLinkProduct>

    <div class="box-y flex p-8">
      <div class="product__title box-y">
        <p class="c-sub">
          {{ product.article }}
        </p>

        <h3 class="text-center h2 line-clamp-2 min-h-12 box-x">
          <span>{{ product.name }}</span>
        </h3>

        <p>{{ product.description }}</p>
      </div>

      <div class="box-x">
        <div class="product__price box-x gap-2">
          <p v-if="product.has_price_discount" class="px-2 bg-mark c-w">
            {{ product.price_discount_string }}
          </p>

          <p
            :class="{
              product__price_del: product.has_price_discount,
            }"
          >
            {{ product.price_string }}
          </p>
        </div>

        <div class="box-x gap-4">
          <ButtonFavorite :product="product" :is_mini="true" />
          <ButtonComparison :product="product" :is_mini="true" />
          <ButtonAddToCart :product="product" :is_mini="true" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
//
.product
  &__item
    +w
    +br
  &__price
    color: $b
    font-weight: 700
    &_del
      +c-sub
      font-weight: 400
      text-decoration: line-through;
</style>
