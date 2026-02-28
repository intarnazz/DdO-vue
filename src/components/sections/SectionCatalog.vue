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
import ButtonFavorite from '../buttons/ButtonFavorite.vue'

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

        <div
          v-if="p.products.length"
          class="catalog__grid"
          :class="{
            'opacity-80': p.is_loading,
          }"
        >
          <div
            v-for="(product, key) in p.products"
            :key="product.id"
            class="catalog__item box-y center gap-4"
          >
            <RouterLink
              :to="{
                name: 'product',
                params: {
                  type: props.type,
                  model: product.variant.name,
                  id: product.id,
                  name: product.name.replace(/[^\p{L}\p{N}]+/gu, ''),
                },
              }"
              class="box-y center gap-4"
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
            </RouterLink>
            <div class="box-x gap">
              <ButtonFavorite :product="product" :is_mini="true" />
              <IconBarChart />
              <IconShopping />
            </div>
          </div>
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
