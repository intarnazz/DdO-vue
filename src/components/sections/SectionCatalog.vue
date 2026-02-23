<script setup lang="ts">
import { product as p } from '@/api/api'
import { price } from '@/utilte/utilte'
import ComponentImg from '@/components/ComponentImg.vue'
import IconBarChart from '@/components/icons/IconBarChart.vue'
import IconShopping from '@/components/icons/IconShopping.vue'
import IconFavorite from '@/components/icons/IconFavorite.vue'
import CatalogTitle from '@/components/domains/catalog/CatalogTitle.vue'
import CatalogLimit from '@/components/domains/catalog/CatalogLimit.vue'
import AsideFilters from '@/components/asides/AsideFilters.vue'
import CatalogOrder from '@/components/domains/catalog/CatalogOrder.vue'
import CatalogPagination from '@/components/domains/catalog/CatalogPagination.vue'
import FormSearch from '@/components/forms/FormSearch.vue'
import ComponentLoader from '../ComponentLoader.vue'

const props = defineProps(['type'])
</script>

<template>
  <section class="catalog box-y gap-8">
    <div class="box-x gap-8">
      <CatalogTitle />
      <FormSearch />
    </div>
    <div class="box-x as gap-8">
      <AsideFilters />
      <div class="w box-y gap-8 justify-start">
        <div class="box-x gap-4">
          <CatalogOrder
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
          <CatalogLimit :arguments="[48, 96, 192]" />
        </div>
        <div v-if="p.products.length" class="catalog__grid">
          <RouterLink
            :to="{
              name: 'product',
              params: {
                type: props.type,
                id: product.id,
                name: product.name.replace(/[^\p{L}\p{N}]+/gu, ''),
              },
            }"
            v-for="(product, key) in p.products"
            :key="key"
            class="box-y center catalog__item gap-4"
            :class="{
              'opacity-80': p.is_loading,
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
          </RouterLink>
        </div>
        <div v-else class="box-x center w">
          <ComponentLoader />
        </div>
        <div class="center">
          <CatalogPagination />
        </div>
      </div>
    </div>
  </section>
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
