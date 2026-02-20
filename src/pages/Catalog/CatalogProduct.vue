<script setup lang="ts">
import { product } from '@/api/api'
import { up_fast } from '@/utilte/utilte'
import { onMounted, onUnmounted, ref } from 'vue'

const props = defineProps(['id'])

const is_loading = ref(true)

onMounted(async () => {
  up_fast()
  is_loading.value = true
  await product.init_product(Number(props.id))
  is_loading.value = false
})

onUnmounted(product.resetProduct)
</script>

<template>
  <template v-if="!is_loading">
    <h2>CatalogProduct {{ product.product.id }}</h2>
    <p>
      {{ product.product }}
    </p>
  </template>
</template>

<style lang="sass" scoped></style>
