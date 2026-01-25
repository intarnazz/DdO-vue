<script setup>
import { onMounted, ref } from 'vue'
import { product as p, image } from '@/api/api'
import ComponentImg from '@/components/ComponentImg.vue'

const isLoading = ref(true)
const product = ref(null)

async function init() {
  isLoading.value = true
  const res = await p.get(1)
  if (res.success) product.value = res.data
  isLoading.value = false
}

onMounted(async () => {
  await init()
})
</script>

<template>
  <div v-if="!isLoading" class="about">
    <ComponentImg :id="14" class="h-dvh object-cover" />
  </div>
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
