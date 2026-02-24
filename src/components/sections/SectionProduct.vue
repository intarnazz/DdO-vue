<script setup lang="ts">
import { product } from '@/api/api'
import ComponentImg from '../ComponentImg.vue'
</script>

<template>
  <section class="product box-y gap-8">
    <div class="box-x gap-8 as">
      <div class="box-y flex">
        <div class="box-x gap-4 content center">
          <div class="box-x relative h-132.5">
            <ComponentImg
              class="product__img object-cover h-full w-full"
              :storage="product.product.image.path"
            />
          </div>
          <div class="box-x relative h-132.5">
            <ComponentImg
              class="product__img object-cover h-full w-full"
              :storage="product.product.image.second_path"
            />
          </div>
        </div>
      </div>
      <div class="box-y flex">
        <h2>{{ product.product.name }}</h2>
      </div>
    </div>
  </section>
</template>

<style lang="sass" scoped>
//
.product
  &__img
    box-shadow: 0px 15px 20px 0px $b-50
</style>
