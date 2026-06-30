<script setup lang="ts">
import { product } from '@/api/api'
import ButtonAddToCart from '@/components/buttons/ButtonAddToCart.vue'
import ProductDiscount from '@/components/domains/product/ProductDiscount.vue'
import IconTaskAlt from '@/components/icons/IconTaskAlt.vue'
import {
  current_price_key,
  price,
  set_current_price_key,
} from '@/components/sections/products/current_price.use'
import interior_is_valid from '@/components/sections/products/interior_is_valid.use'
import ProductCharacteristics from '@/components/sections/products/ProductCharacteristics.vue'
import ProductColors from '@/components/sections/products/ProductColors.vue'
import ProductContacts from '@/components/sections/products/ProductContacts.vue'
import ProductImages from '@/components/sections/products/ProductImages.vue'
import ProductPrice from '@/components/sections/products/ProductPrice.vue'
import ProductTitle from '@/components/sections/products/ProductTitle.vue'
import RouterLinkCatalog from '@/layout/router-links/RouterLinkCatalog.vue'
import { title } from '@/utilte/utilte'
</script>

<template>
  <!-- ? 1 BOX -->
  <section class="product box-y gap-8 relative">
    <ProductTitle class="lg:hidden mt-12 mb-4" :product="product" />
    <div class="flex gap-8 as max-lg:flex-col">
      <ProductImages />

      <!-- ? RIGHT BOX -->
      <div class="product__right-box box-y flex-1 js gap-8">
        <ProductTitle class="max-lg:hidden" :product="product" />

        <div class="product__bitton-cart-box box-y border p-4 gap-8">
          <ProductCharacteristics :product="product.product" />

          <div class="box-x js gap-4">
            <div class="box-y">
              <p
                :class="{
                  'opacity-0': !product.product.has_price_discount,
                }"
                class="line-through c-sub"
              >
                {{ product.product.price_string }}
              </p>
              <button
                @click="set_current_price_key('price_discount')"
                :class="{
                  active: current_price_key === 'price_discount',
                }"
                class="product__price-wrapper box-y box br p-2 text-left"
              >
                <ProductPrice :price="product.product.price_discount" />
                <p v-if="interior_is_valid">полотно</p>
                <p v-else>база</p>
              </button>
            </div>

            <div v-if="product.product.price !== product.product.total_price" class="box-y">
              <p
                :class="{
                  'opacity-0': !product.product.has_price_discount,
                }"
                class="line-through c-sub"
              >
                {{ product.product.total_price_string }}
              </p>
              <button
                @click="set_current_price_key('total_price_discount')"
                :class="{
                  active: current_price_key === 'total_price_discount',
                }"
                class="product__price-wrapper box-y box br p-2 text-left"
              >
                <ProductPrice :price="product.product.total_price_discount" />
                <p>комплект</p>
              </button>
            </div>
            <ProductDiscount :product="product.product" />
          </div>

          <div class="product__is-stock box-x js gap-8">
            <div
              :title="product.product.is_stock ? 'Доступно к покупке' : 'НЕ доступно к покупке'"
              class="box-x gap-2"
            >
              <p>в наличии</p>
              <IconTaskAlt :active="Boolean(product.product.is_stock)" />
            </div>

            <div
              :title="
                product.product.is_in_store
                  ? 'Присутствует в магазине'
                  : 'НЕ присутствует в магазине'
              "
              class="box-x gap-2"
            >
              <p>Есть в магазине</p>
              <IconTaskAlt :active="Boolean(product.product.is_in_store)" />
            </div>
          </div>

          <div class="product__button-wrapper box-x">
            <ButtonAddToCart :price="price" :product="product.product" />
            <!-- 
            [ ] Страница корзины // ссылка на корзинку // добавить в корзину ещё +1 раз
            -->
          </div>
        </div>

        <ProductContacts />



        <ProductColors />



        <div class="box-x js">
          <RouterLinkCatalog
            :type_id="product.product.type.id"
            :query="{
              brand: product.product.brand.id,
            }"
            :type_name="
              product.product.type.name
              // [ ] ссылка на каталог и фильтром бренда
            "
            class="a"
          >
            <h3>Все модели бренда {{ title(product.product.brand.name) }}</h3>
          </RouterLinkCatalog>
        </div>
        <div class="box-x js">
          <RouterLinkCatalog
            :type_id="product.product.type.id"
            :query="{
              variant: product.product.variant.id,
            }"
            :type_name="
              product.product.type.name
              // [ ] ссылка на каталог и фильтром бренда
            "
            class="a"
          >
            <h3>Все модели {{ title(product.product.variant.name) }}</h3>
          </RouterLinkCatalog>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="sass" scoped>
.product
  &__price-wrapper
    border-bottom: 5px solid #00000000
    &.active
      border-bottom: 5px solid $main
</style>
