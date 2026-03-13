<script setup lang="ts">
import { product as p } from '@/api/api'
import CatalogTitle from '@/components/domains/catalog/CatalogTitle.vue'
import CatalogLimit from '@/components/domains/catalog/CatalogLimit.vue'
import AsideFilters from '@/components/asides/AsideFilters.vue'
import CatalogOrder from '@/components/domains/catalog/CatalogOrder.vue'
import CatalogPagination from '@/components/domains/catalog/CatalogPagination.vue'
import FormSearch from '@/components/forms/FormSearch.vue'
import ComponentLoader from '@/components/ComponentLoader.vue'
import CatalogItem from '@/components/domains/catalog/CatalogItem.vue'
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
          <!-- 
          //FIXME: передача типа
          -->
        </div>

        <div
          v-if="p.products.length"
          class="catalog__grid"
          :class="{
            'opacity-80': p.is_loading,
          }"
        >
          <CatalogItem v-for="(product, key) in p.products" :key="product.id" :product="product" />
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
  &__grid
    display: grid
    grid-template-columns: 1fr 1fr 1fr
    gap: 2rem
</style>
