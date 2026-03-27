<script setup lang="ts">
import { product } from '@/api/api'
import ComponentImg from '@/components/ComponentImg.vue'
import ComponentSelect from '@/components/ComponentSelect.vue'
import ButtonAddToCart from '@/components/buttons/ButtonAddToCart.vue'
import ButtonComparison from '@/components/buttons/ButtonComparison.vue'
import ButtonFavorite from '@/components/buttons/ButtonFavorite.vue'
import IconHandshake from '@/components/icons/IconHandshake.vue'
import IconIndeterminateQuestionBox from '@/components/icons/IconIndeterminateQuestionBox.vue'
import IconTaskAlt from '@/components/icons/IconTaskAlt.vue'
import RouterLinkCatalog from '@/layout/router-links/RouterLinkCatalog.vue'
import { price } from '@/utilte/utilte'
import { computed } from 'vue'

const product_price = computed(() => price(product.product.price)) //[ ]: component

const size_characteristics = computed(() =>
  //[ ]: component
  product.product.characteristics.filter((c) => c.filter.name === 'size'),
)

const color_characteristics = computed(() =>
  //[ ]: component
  product.product.characteristics.filter((c) => c.filter.name === 'color'),
)

// [ ] - Полная секция продукта //:выделить компонент
// [ ] - Полная секция продукта //: product__price: Вычисляемое свойство "обрамления"
</script>

<template>
  <section class="product box-y gap-8">
    <div class="box-x gap-8 as">
      <div class="product__left-box box-y flex">
        <div class="box-x gap-4 content center">
          <div class="box-x relative h-132.5">
            <ComponentImg
              class="product__img object-cover h-full w-full"
              :storage="product.product.image_primary.path"
            />
          </div>
          <div class="box-x relative h-132.5">
            <ComponentImg
              class="product__img object-cover h-full w-full"
              :storage="product.product.image_secondary.path"
            />
          </div>
        </div>
      </div>
      <div class="product__right-box box-y flex js gap-8">
        <h2>{{ product.product.name }}</h2>
        <div class="product__button-wrapper box-x js gap-8">
          <ButtonFavorite :product="product.product" />
          <ButtonComparison :product="product.product" />
          <p class="c-sub">{{ product.product.article }}</p>
        </div>

        <div class="product__bitton-cart-box box-y border p-4 gap-8">
          <div class="box-y gap-4">
            <div class="box-x js gap-8">
              <strong> размер блока </strong>
              <RouterLink
                class="a box-x gap-2 c-sub a_sub font-normal"
                :to="{
                  name: 'home', // [ ] - Страница документации //: ссылка на документацию
                }"
              >
                <IconIndeterminateQuestionBox />

                <span>как сделать замеры?</span>
              </RouterLink>
            </div>

            <div class="box-x js gap-8">
              <ComponentSelect :options="size_characteristics" />
              <div class="box-x">
                <RouterLink
                  class="a box-x gap-2 c-sub a_sub font-normal"
                  :to="{
                    name: 'home', //[ ]: Страница Контакты // ссылка на контакты
                  }"
                >
                  <IconHandshake />
                  <span> вызвать замерщика </span>
                </RouterLink>
              </div>
            </div>
          </div>

          <div class="box-x js gap-4">
            <div class="box-y box br p-2">
              <strong class="product__price font-normal">
                {{ product_price }}
                <!-- 
                // [ ]  Полная секция продукта // Выбор между разными price
                -->
              </strong>
              <p>комплект</p>
            </div>

            <div class="box-y box br p-2">
              <strong class="product__price font-normal">
                {{ product_price }}
              </strong>
              <p>комплект</p>
            </div>
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
            <ButtonAddToCart :product="product.product" />
            <!-- 
            // [ ] Страница корзины // ссылка на корзинку // добавить в корзину ещё +1 раз
            -->
          </div>
        </div>

        <div class="product__contact">
          <!-- {{ contact. }} // [ ]: сущность contact -->
        </div>
        <div v-if="color_characteristics[0]" class="product__color">
          {{ color_characteristics[0].name }}
        </div>
        <RouterLinkCatalog
          :query="{
            brand: product.product.brand.id,
          }"
          :type_name="
            product.product.type.name
            // TODO ссылка на каталог и фильтром бренда
          "
          class="box-x js gap-1"
        >
          <p class="">Все модели бренда</p>
          <p>{{ product.product.brand.name }}</p>
        </RouterLinkCatalog>
        <RouterLinkCatalog
          :type_name="
            product.product.type.name
            // TODO ссылка на каталог и фильтром модели
          "
          class="box-x js gap-1"
        >
          <p class="">Все модели</p>
          <p>{{ product.product.variant.name }}</p>
        </RouterLinkCatalog>
      </div>
    </div>
  </section>
</template>

<style lang="sass" scoped>
//
.product
  &__price
    font-size: 2rem
  &__img
    box-shadow: 0px 15px 20px 0px $b-50
</style>
