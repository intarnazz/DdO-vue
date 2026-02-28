<script setup lang="ts">
import SectionProduct from '@/components/sections/SectionProduct.vue'
import { up_fast } from '@/utilte/utilte'
import { onMounted } from 'vue'

const props = defineProps(['id'])

onMounted(async () => {
  up_fast()
})
</script>

<template>
  <SectionProduct />
</template>

<style lang="sass" scoped></style>
