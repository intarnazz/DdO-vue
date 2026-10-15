<script setup lang="ts">
import { product } from '@/api/api'
import ProductVideo from '@/components/sections/products/ProductVideo.vue'

// product.product.is_loading

</script>

<template>
  <section class="box-y gap-8">
    <h2>описание</h2>
    <div class="flex justify-between max-sm:flex-col-reverse gap-8 as">
      <!-- ? LEFT BOX -->
      <div class="flex flex-col flex-1 gap-4">
        <div
          v-for="characteristic in product.product.characteristics"
          :key="characteristic.id"
          class="box-x box p-2 br gap-4"
        >
          <strong class="c-sub flex-1">{{ characteristic.filter.name }}:</strong>
          <p class="flex-3">{{ characteristic.description }}</p>
        </div>
      </div>
      <!-- ? RIGHT BOX -->
      <div class="flex flex-col gap-8 flex-1">
        <ProductVideo :video_url="product.product.video_url" />
        <div v-if="product.product.description">
          <h3>
            <strong class="c-sub"> Подробнее о продукте </strong>
          </h3>
          <p>
            {{ product.product.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="sass" scoped>
.video
  background-color: $main
  box-shadow: 5px 5px 0 0 $main
</style>
