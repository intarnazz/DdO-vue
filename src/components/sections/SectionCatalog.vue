<script setup lang="ts">
import { filter, product as p, type } from '@/api/api'
import CatalogTitle from '@/components/domains/catalog/CatalogTitle.vue'
import CatalogLimit from '@/components/domains/catalog/CatalogLimit.vue'
import AsideFilters from '@/components/asides/AsideFilters.vue'
import CatalogOrder from '@/components/domains/catalog/CatalogOrder.vue'
import CatalogPagination from '@/components/domains/catalog/CatalogPagination.vue'
import FormSearch from '@/components/forms/FormSearch.vue'
import CatalogItem from '@/components/domains/catalog/CatalogItem.vue'
import ComponentLoader404 from '@/components/ComponentLoader404.vue'
import ComponentLoader from '@/components/ComponentLoader.vue'
import ToggleCatalogProductIsFavorite from '@/components/buttons/toggle/ToggleCatalogProductIsFavorite.vue'
</script>

<template>
  <section class="catalog box-y gap-8">
    <div class="flex justify-between gap-8 max-sm:flex-col">
      <CatalogTitle :type="type.type" :paging-info="p.pagingInfo" :filter="filter" />
      <FormSearch />
    </div>
    <div class="box-x as gap-8">
      <AsideFilters />
      <div class="w box-y gap-8 justify-start">
        <div class="box-y gap-4">
          <div class="flex justify-between gap-4 max-sm:flex-col">
            <CatalogOrder
              :arguments="[
                {
                  text: 'новинки',
                  type: '',
                },
                {
                  text: 'самые популярные',
                  type: 'views',
                  desc: 'desc',
                },
                {
                  text: 'цена',
                  type: 'price',
                  turn: true,
                },
                {
                  text: 'скидки',
                  type: 'discount',
                  desc: 'desc',
                },
              ]"
            />
            <CatalogLimit :arguments="[48, 96, 192]" />
          </div>
          <div class="box-x">
            <ToggleCatalogProductIsFavorite />
          </div>
        </div>
        <div
          v-if="p.products.length > 0"
          class="catalog__grid"
          :class="{
            'opacity-80': p.is_loading, // [ ] component products
          }"
        >
          <CatalogItem
            v-for="product in p.products"
            :key="product.id"
            :product="product"
            :filter="filter"
          />
        </div>
        <div v-else-if="p.is_loading" class="box-x center w">
          <ComponentLoader />
        </div>
        <div v-else class="box-x center w">
          <ComponentLoader404 />
        </div>
        <div v-if="!p.is_loading" class="center">
          <CatalogPagination />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="sass" scoped>
//
.catalog
  &__grid
    display: grid
    grid-template-columns: repeat( auto-fill, minmax(17.4375rem, 1fr) )
    gap: 1rem
</style>
