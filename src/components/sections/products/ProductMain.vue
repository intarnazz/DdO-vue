<script setup lang="ts">
import { product, user } from '@/api/api'
import { contacts } from '@/api/api_domains/contact/contacts'
import Product from '@/api/local_domains/catalog/product/product.model'
import { Image } from '@/api/local_domains/catalog/product/types'
import ComponentImg from '@/components/ComponentImg.vue'
import ComponentOpenImage from '@/components/ComponentOpenImage.vue'
import ComponentRecolorText from '@/components/ComponentRecolorText.vue'
import ComponentSelect from '@/components/ComponentSelect.vue'
import ButtonAddToCart from '@/components/buttons/ButtonAddToCart.vue'
import ButtonComparison from '@/components/buttons/ButtonComparison.vue'
import ButtonFavorite from '@/components/buttons/ButtonFavorite.vue'
import ButtonInterior from '@/components/buttons/ButtonInterior.vue'
import ProductColor from '@/components/domains/product/ProductColor.vue'
import ProductDiscount from '@/components/domains/product/ProductDiscount.vue'
import IconHandshake from '@/components/icons/IconHandshake.vue'
import IconIndeterminateQuestionBox from '@/components/icons/IconIndeterminateQuestionBox.vue'
import IconTaskAlt from '@/components/icons/IconTaskAlt.vue'
import ProductPrice from '@/components/sections/products/ProductPrice.vue'
import LayoutIcon from '@/layout/LayoutIcon.vue'
import RouterLinkCatalog from '@/layout/router-links/RouterLinkCatalog.vue'
import RouterLinkProduct from '@/layout/router-links/RouterLinkProduct.vue'
import { formatPhone, title } from '@/utilte/utilte'
import { computed, onMounted, Ref, ref } from 'vue'

const size_characteristics = computed(() =>
  //[ ]: component
  product.product.characteristics.filter((c) => c.filter.name === 'size'),
)

// [ ] - Полная секция продукта //:выделить компонент
// [ ] - Полная секция продукта //: product__price: Вычисляемое свойство "обрамления"

const current_image: Ref<Image | Image[] | null> = ref(null)
const index: Ref<number> = ref(0)

const set_current_image = (image: null | Image | Image[], key: number = 0) => {
  current_image.value = image
  index.value = key
}

const interior_is_valid = ref(
  product.product.type.name === 'entrance-doors' || product.product.type.name === 'interior-doors',
)

onMounted(() => contacts.load())

const phone = computed(() =>
  formatPhone(contacts.items.find((i) => i.name === 'phone')?.description || ''),
)
</script>

<template>
  <!-- ? 1 BOX -->
  <section class="product box-y gap-8 relative">
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
              v-if="interior_is_valid"
              class="h-full img br"
              src="@/assets/img/product_image_bg.jpg"
              alt="product_image_bg"
            />
          </div>
        </LayoutIcon>

        <div class="box-x gap-4 relative content center">
          <button
            v-if="!user.interior_is_active.value || !product.product.image_secondary"
            class="box-x relative h-132.5"
          >
            <ComponentImg
              @click="set_current_image(product.product.image_primary)"
              :class="{
                product__img_shadow: !user.interior_is_active.value,
              }"
              class="product__img object-cover h-full cursor-zoom-in"
              :storage="product.product.image_primary.path"
            />
          </button>
          <div v-if="product.product.image_secondary" class="box-x relative h-132.5">
            <ComponentImg
              @click="set_current_image(product.product.image_secondary)"
              :class="{
                product__img_shadow: !user.interior_is_active.value,
              }"
              class="product__img object-cover h-full w-full cursor-zoom-in"
              :storage="product.product.image_secondary.path"
            />
          </div>
        </div>

        <ComponentOpenImage
          v-if="current_image"
          @close="set_current_image(null)"
          :image="current_image"
          :index="index"
        />

        <div class="product__image-list relative">
          <div
            v-for="(image, key) in product.product.images"
            :key="image.id"
            @click="set_current_image(product.product.images, key)"
            class="h-25 product__image-list-item center cursor-zoom-in box br"
          >
            <ComponentImg class="br h-full object-cover" :id="image.id" :max_h="100" />
          </div>
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
          <ButtonInterior v-if="interior_is_valid" />
          <ButtonComparison :product="product.product" />
        </div>

        <div class="product__bitton-cart-box box-y border p-4 gap-8">
          <div v-if="size_characteristics.length" class="box-y gap-4">
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
            <div class="box-y">
              <p
                :class="{
                  'opacity-0': !product.product.has_price_discount,
                }"
                class="line-through c-sub"
              >
                {{ product.product.price_string }}
              </p>
              <div class="box-y box br p-2">
                <ProductPrice
                  :price="
                    product.product.has_price_discount
                      ? product.product.price_discount
                      : product.product.price
                  "
                />
                <p>полотно</p>
              </div>
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
              <div class="box-y box br p-2">
                <!-- [ ]: выбор -->

                <ProductPrice
                  :price="
                    product.product.has_price_discount
                      ? product.product.total_price_discount
                      : product.product.total_price
                  "
                />
                <p>комплект</p>
              </div>
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
            <ButtonAddToCart :product="product.product" />
            <!-- 
            [ ] Страница корзины // ссылка на корзинку // добавить в корзину ещё +1 раз
            -->
          </div>
        </div>
        <div v-if="phone" class="box-y gap-4">
          <h3>номер</h3>
          <p class="product__contact h2">
            <ComponentRecolorText :text="phone" />
          </p>
        </div>
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
//
.product
  &__list
    display: grid
    grid-template-columns: 1fr 1fr 1fr 1fr
  &__image-list
    display: grid
    gap: 1rem
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr
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
