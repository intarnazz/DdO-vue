<script setup>
import { onMounted, ref, computed, watchEffect } from 'vue'
import { product as p } from '@/api/api'
import { price } from '@/utilte/utilte'
import ComponentImg from '@/components/ComponentImg.vue'
import IconBarChart from '@/components/icons/IconBarChart.vue'
import IconShopping from '@/components/icons/IconShopping.vue'
import IconFavorite from '@/components/icons/IconFavorite.vue'
import AsideFilters from '@/components/asides/AsideFilters.vue'

const isLoding = ref(true)
const totalCount = ref(null)

function init() {
  isLoding.value = true
  p.all()
  isLoding.value = false
}

onMounted(() => {
  init()
})
</script>

<template>
  <soction class="catalog box-y gap2">
    <div class="box-x gap as">
      <h2>Входные Двери</h2>
      <p class="c-sub">{{ totalCount }} товаров</p>
      <div class="flex"></div>
    </div>
    <div class="box-x as gap2">
      <AsideFilters />
      <div class="catalog__grid flex">
        <template v-if="!isLoding">
          <div v-for="(product, key) in p.products.data" :key="key" class="box-y center gap-4">
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
        </template>
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
