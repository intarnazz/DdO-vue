<script setup lang="ts">
import { product } from '@/api/api'

//[ ]: component

// [ ] - Полная секция продукта //:выделить компонент
// [ ] - Полная секция продукта //: product__price: Вычисляемое свойство "обрамления"
</script>

<template>
  <section class="box-y gap-8">
    <div class="box-x gap-8 as">
      <!-- ? LEFT BOX -->
      <div class="box-y flex gap-4">
        <div
          v-for="characteristic in product.product.characteristics"
          :key="characteristic.id"
          class="box-x box p-2 br gap-4"
        >
          <!-- TODO: добавить ":" -->
          <strong class="c-sub flex-1">{{ characteristic.filter.name }}</strong>
          <p class="flex-4">{{ characteristic.description }}</p>
        </div>
      </div>
      <!-- ? RIGHT BOX -->
      <div class="box-y flex">
        <p>
          Стальной дверной блок с открыванием наружу. Поставляется с правым и левым открыванием.
        </p>
      </div>
    </div>
  </section>
</template>

<style lang="sass" scoped></style>
