<script setup>
import { onMounted, ref } from 'vue'
import { product as p } from '@/api/api'

const isLoding = ref(true)
const product = ref(null)
const totalCount = ref(null)

async function init() {
  isLoding.value = true
  const res = await p.all()
  if (res.success) ((product.value = res.data), (totalCount.value = res.pagingInfo.totalCount))
  isLoding.value = false
}

onMounted(async () => {
  await init()
})
</script>

<template>
  <soction v-if="!isLoding" class="catalog">
    <div class="box-x gap as">
      <h2>Входные Двери</h2>
      <p class="c-sub">{{ totalCount }} товаров</p>
      <div class="flex"></div>
    </div>
  </soction>
</template>

<style></style>
