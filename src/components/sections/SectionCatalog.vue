<script setup>
import { product as p, type } from '@/api/api'
import { price } from '@/utilte/utilte'
import ComponentImg from '@/components/ComponentImg.vue'
import IconBarChart from '@/components/icons/IconBarChart.vue'
import IconShopping from '@/components/icons/IconShopping.vue'
import IconFavorite from '@/components/icons/IconFavorite.vue'
import AsideFilters from '@/components/asides/AsideFilters.vue'
import ComponentLoader from '@/components/ComponentLoader.vue'
import ComponentSwitch from '@/components/ComponentSwitch.vue'
</script>

<template>
  <soction class="catalog box-y gap2">
    <div class="box-x gap as">
      <h2>{{ type.value.visible_name }}</h2>
      <p class="c-sub">{{ p.products.pagingInfo?.totalCount }} товаров</p>
      <div class="flex"></div>
    </div>
    <div class="box-x as gap2">
      <AsideFilters />
      <div class="w box-y gap-8 justify-start">
        <ComponentSwitch
          :arguments="[
            {
              text: 'новинки',
              type: '',
            },
            {
              text: 'самые популярные',
              type: 'views',
            },
            {
              text: 'цена',
              type: 'price',
              desc: 'desc',
              turn: true,
            },
            {
              text: 'скидки',
              type: 'discount',
            },
            {
              text: 'модель',
              type: 'variant_id',
            },
          ]"
        />
        <div v-if="p.products.data.length > 0" class="catalog__grid">
          <div
            v-for="(product, key) in p.products.data"
            :key="key"
            class="box-y center catalog__item gap-4"
            :class="{
              'opacity-50': !p.is_loading,
            }"
          >
            <div class="box-x gap-2 content center">
              <div class="box-x relative h-67.5 max-h-67.5">
                <ComponentImg
                  class="catalog__img object-cover h-full w-full"
                  :id="product.image.id"
                />
              </div>
              <div class="box-x relative h-67.5 max-h-67.5">
                <ComponentImg
                  class="catalog__img object-cover h-full w-full"
                  :id="product.image.id"
                />
              </div>
            </div>
            <h3 class="catalog__title title">{{ product.name }}</h3>
            <p class="catalog__price">{{ price(product.price) }}</p>
            <div class="box-x gap">
              <IconFavorite />
              <IconBarChart />
              <IconShopping />
            </div>
          </div>
        </div>
        <div v-else class="box-x center w">
          <!-- From Uiverse.io by mobinkakei -->
          <ComponentLoader />
        </div>
      </div>
    </div>
  </soction>
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
  &__grid
    display: grid
    grid-template-columns: 1fr 1fr 1fr
    gap: 2rem
</style>
