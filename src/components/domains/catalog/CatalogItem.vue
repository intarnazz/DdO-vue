<script setup lang="ts">
import { product as p, type } from '@/api/api'
import { price } from '@/utilte/utilte'
import ComponentImg from '@/components/ComponentImg.vue'
import IconBarChart from '@/components/icons/IconBarChart.vue'
import IconShopping from '@/components/icons/IconShopping.vue'
import ButtonFavorite from '@/components/buttons/ButtonFavorite.vue'
import { computed } from 'vue'

const props = defineProps<{
  product: typeof p.product
}>()

const product = computed(() => props.product)

function set_product() {
  p.product = product.value
}
</script>

<template>
  <div class="catalog__item box-y center gap-4">
    <RouterLink
      @click="set_product"
      :to="{
        name: 'product',
        params: {
          type: type.type.name,
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
            :storage="product.image.path"
            :is_lazy="true"
          />
        </div>
        <div class="box-x relative h-67.5 max-h-67.5">
          <ComponentImg
            class="catalog__img object-cover h-full w-full"
            :storage="product.image.second_path"
            :is_lazy="true"
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
</style>
