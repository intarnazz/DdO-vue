<script setup>
import { onMounted, ref } from 'vue'
import { product as p } from '@/api/api'

const isLoding = ref(true)
const product = ref(null)

async function init() {
  isLoding.value = true
  const res = await p.all()
  if (res.success) product.value = res.data
  isLoding.value = false
}

onMounted(async () => {
  await init()
})
</script>

<template>
  <soction v-if="!isLoding" class="catalog">
    <h2>
      Входные Двери
    </h2>

  </soction>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
