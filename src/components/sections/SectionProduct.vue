<script setup lang="ts">
import { product, user } from '@/api/api'
import { Image } from '@/api/local_domains/catalog/product/types'
import ComponentImg from '@/components/ComponentImg.vue'
import ComponentOpenImage from '@/components/ComponentOpenImage.vue'
import ComponentSelect from '@/components/ComponentSelect.vue'
import ButtonAddToCart from '@/components/buttons/ButtonAddToCart.vue'
import ButtonComparison from '@/components/buttons/ButtonComparison.vue'
import ButtonFavorite from '@/components/buttons/ButtonFavorite.vue'
import ButtonInterior from '@/components/buttons/ButtonInterior.vue'
import IconHandshake from '@/components/icons/IconHandshake.vue'
import IconIndeterminateQuestionBox from '@/components/icons/IconIndeterminateQuestionBox.vue'
import IconTaskAlt from '@/components/icons/IconTaskAlt.vue'
import LayoutIcon from '@/layout/LayoutIcon.vue'
import RouterLinkCatalog from '@/layout/router-links/RouterLinkCatalog.vue'
import { price } from '@/utilte/utilte'
import { computed, Ref, ref } from 'vue'

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
// LARAVEL: delete лишнее фото

const current_image: Ref<Image | null> = ref(null)
const set_current_image = (image: null | Image) => (current_image.value = image)
</script>

<template>
  <section class="product box-y gap-8">
    <div class="box-x gap-8 as">
      <!-- ? LEFT BOX -->
      <div class="product__left-box box-y flex gap-16 relative">
        <LayoutIcon
          v-slot="{ active, active_on, active_off }"
          :active="user.interior_is_active.value"
        >
          <div
            :class="{
              'opacity-100': active,
              'opacity-0': !active,
              interior_active_on: active_on,
              interior_active_off: active_off,
            }"
            class="absolute top-0 left-0 h-162.5 w-full -mt-8"
          >
            <img
              class="h-full img br"
              src="@/assets/img/product_image_bg.jpg"
              alt="product_image_bg"
            />
          </div>
        </LayoutIcon>

        <div class="box-x gap-4 relative content center">
          <div v-if="!user.interior_is_active.value" class="box-x relative h-132.5">
            <ComponentImg
              :class="{
                product__img_shadow: !user.interior_is_active.value,
              }"
              class="product__img object-cover h-full"
              :storage="product.product.image_primary.path"
            />
          </div>
          <div class="box-x relative h-132.5">
            <ComponentImg
              :class="{
                product__img_shadow: !user.interior_is_active.value,
              }"
              class="product__img object-cover h-full w-full"
              :storage="product.product.image_secondary.path"
            />
          </div>
        </div>

        <ComponentOpenImage
          v-if="current_image"
          @close="set_current_image(null)"
          :image="current_image"
        />

        <div class="product__image-list relative">
          <button
            v-for="image in product.product.images"
            :key="image.id"
            @click="set_current_image(image)"
            class="h-25 product__image-list-item center"
          >
            <ComponentImg class="br h-full object-cover" :storage="image.path" />
          </button>
        </div>
      </div>

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
                 [ ]  Полная секция продукта // Выбор между разными price
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
            [ ] Страница корзины // ссылка на корзинку // добавить в корзину ещё +1 раз
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
            // [ ] ссылка на каталог и фильтром бренда
          "
          class="box-x js gap-1"
        >
          <p class="">Все модели бренда</p>
          <p>{{ product.product.brand.name }}</p>
        </RouterLinkCatalog>
        <RouterLinkCatalog
          :type_name="
            product.product.type.name
            // [ ] ссылка на каталог и фильтром модели
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
  &__image-list
    display: grid
    gap: 1rem
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr
  &__price
    font-size: 2rem
  &__img
    &_shadow
      box-shadow: 0px 15px 20px 0px $b-50

.interior_active_on
  animation: interior_active_on .125s forwards ease-in

.interior_active_off
  animation: interior_active_off .125s forwards ease-in

@keyframes interior_active_on
  0%
    opacity: 0%
  100%
    opacity: 100%
@keyframes interior_active_off
  0%
    opacity: 100%
  100%
    opacity: 0%
</style>
