<script setup>
import { onMounted, ref } from 'vue'
import { product as p } from '@/api/api'
import ComponentImg from '@/components/ComponentImg.vue'

const isLoding = ref(true)
const products = ref(null)
const totalCount = ref(null)

async function init() {
  isLoding.value = true
  const res = await p.all({
    limit: 48,
  })
  if (res.success) ((products.value = res.data), (totalCount.value = res.pagingInfo.totalCount))
  isLoding.value = false
}

onMounted(async () => {
  await init()
})
</script>

<template>
  <soction v-if="!isLoding" class="catalog box-y gap2">
    <div class="box-x gap as">
      <h2>Входные Двери</h2>
      <p class="c-sub">{{ totalCount }} товаров</p>
      <div class="flex"></div>
    </div>
    <div class="box-x">
      <aside></aside>
      <div class="catalog__grid flex">
        <div v-for="(product, key) in products" :key="key" class="box-y center gap-4">
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
        </div>
      </div>
    </div>
  </soction>
</template>

<style lang="sass" scoped>
//
.catalog
  &__img
    box-shadow: 0px 15px 20px 0px $b-50
  &__grid
    display: grid
    grid-template-columns: 1fr 1fr 1fr
    gap: 30px
</style>
