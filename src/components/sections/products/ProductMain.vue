<script setup lang="ts">
import { product } from '@/api/api'
import Product from '@/api/local_domains/catalog/product/product.model'
import ButtonAddToCart from '@/components/buttons/ButtonAddToCart.vue'
import ButtonComparison from '@/components/buttons/ButtonComparison.vue'
import ButtonFavorite from '@/components/buttons/ButtonFavorite.vue'
import ButtonInterior from '@/components/buttons/ButtonInterior.vue'
import ProductColor from '@/components/domains/product/ProductColor.vue'
import ProductDiscount from '@/components/domains/product/ProductDiscount.vue'
import IconTaskAlt from '@/components/icons/IconTaskAlt.vue'
import {
  current_price_key,
  price,
  set_current_price_key,
} from '@/components/sections/products/current_price.use'
import ProductCharacteristics from '@/components/sections/products/ProductCharacteristics.vue'
import ProductContacts from '@/components/sections/products/ProductContacts.vue'
import ProductImages from '@/components/sections/products/ProductImages.vue'
import ProductPrice from '@/components/sections/products/ProductPrice.vue'
import RouterLinkCatalog from '@/layout/router-links/RouterLinkCatalog.vue'
import RouterLinkProduct from '@/layout/router-links/RouterLinkProduct.vue'
import { title } from '@/utilte/utilte'
</script>

<template>
  <!-- ? 1 BOX -->
  <section class="product box-y gap-8 relative">
    <div class="box-x gap-8 as">
      <ProductImages />

      <!-- ? RIGHT BOX -->
      <div class="product__right-box box-y flex js gap-8">
        <div class="box-y">
          <h2>{{ product.product.name }}</h2>
          <p class="c-sub">{{ product.product.article }}</p>
        </div>

        <div class="product__button-wrapper box-x js gap-8">
          <ButtonFavorite :product="product.product" />
          <ButtonInterior />
          <ButtonComparison :product="product.product" />
        </div>

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
                <p>полотно</p>
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

        <div class="box-y gap-4">
          <h3>цвет</h3>
          <div class="product__color-list box-x js gap-4 flex-wrap">
            <template v-for="p in product.product.variant.products" :key="p.id">
              <RouterLinkProduct
                v-if="p.id !== product.product.id"
                :product="{
                  //[ ]: computed
                  ...new Product(p).object,
                  variant: product.product.variant,
                  characteristics: product.product.characteristics,
                  type: product.product.type,
                }"
              >
                <ProductColor :colors="p.colors" :is_active="false" />
              </RouterLinkProduct>
              <ProductColor v-else :colors="p.colors" :is_active="true" />
            </template>
          </div>
        </div>
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
