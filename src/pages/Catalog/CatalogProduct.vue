<script setup lang="ts">
import { product } from '@/api/api'
import SectionProduct from '@/components/sections/SectionProduct.vue'
import { up_fast } from '@/utilte/utilte'
import { onMounted, onUnmounted, ref } from 'vue'

const props = defineProps(['id'])

const is_loading = ref(true)

onMounted(async () => {
  up_fast()
  is_loading.value = true
  await product.product.init(Number(props.id))
  is_loading.value = false
})

onUnmounted(product.product.reset)
</script>

<template>
  <template v-if="!is_loading">
    <SectionProduct />
  </template>
</template>

<style lang="sass" scoped></style>
