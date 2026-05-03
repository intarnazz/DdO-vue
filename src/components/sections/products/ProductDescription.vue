<script setup lang="ts">
import { product } from '@/api/api'
</script>

<template>
  <section class="box-y gap-8">
    <h2>описание</h2>
    <div class="flex justify-between max-sm:flex-col-reverse gap-8 as">
      <!-- ? LEFT BOX -->
      <div v-if="product.product.characteristics.length > 0" class="box-y flex-1 gap-4">
        <div
          v-for="characteristic in product.product.characteristics"
          :key="characteristic.id"
          class="box-x box p-2 br gap-4"
        >
          <strong class="c-sub flex-1">{{ characteristic.filter.name }}:</strong>
          <p class="flex-4">{{ characteristic.description }}</p>
        </div>
      </div>
      <!-- ? RIGHT BOX -->
      <div class="box-y flex-1">
        <p>
          Стальной дверной блок с открыванием наружу. Поставляется с правым и левым открыванием.
        </p>
        <p v-if="product.product.description">
          {{ product.product.description }}
        </p>
      </div>
    </div>
  </section>
</template>

<style lang="sass" scoped></style>
