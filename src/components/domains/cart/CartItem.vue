<script setup lang="ts">
import ComponentImg from '@/components/ComponentImg.vue'
import RouterLinkProduct from '@/layout/router-links/RouterLinkProduct.vue'
import { ProductType } from '@/api/local_domains/catalog/product'
import ProductDiscount from '@/components/domains/product/ProductDiscount.vue'
import ComponentCount from '@/components/ComponentCount.vue'
import IconDelete from '@/components/icons/IconDelete.vue'
import { cart } from '@/api/api'
import ProductPrice from '@/components/sections/products/ProductPrice.vue'

const { product, count, price } = defineProps<{
  product: ProductType
  count: number
  price: number
}>()

const emit = defineEmits<{
  set_count: [value: number]
}>()

const set_count = (number: number) => emit('set_count', number)

const remove = () => cart.remove_produc(product)
</script>

<template>
  <div class="product border-top br bg-white box-x as shadow-xl">
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

    <div class="box-y gap-8 flex px-8 py-4">
      <div class="product__title box-y">
        <p class="c-sub">
          {{ product.article }}
        </p>

        <h3 class="text-center h2 line-clamp-2 min-h-12 box-x">
          <span>{{ product.name }}</span>
        </h3>

        <p>{{ product.description }}</p>
      </div>

      <div class="box-x gap-8">
        <div class="box-y c-sub">
          <!-- <p v-if="product.has_price_discount">*цена указанна с учётом скидки</p> -->
          <p>
            <ProductPrice :price="price" />
          </p>
        </div>

        <div class="box-x gap-4">
          <button @click="remove" class="button_mini button_delete c-sub box-x">
            <IconDelete />
            <strong>удалить</strong>
          </button>
          |
          <ComponentCount @set_count="set_count" :min="1" :count="count" />
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
