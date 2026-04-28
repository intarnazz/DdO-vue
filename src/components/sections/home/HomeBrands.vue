<script setup lang="ts">
import SectionBrands from '@/components/sections/SectionBrands.vue'
import SectionBrand from '@/components/sections/SectionBrand.vue'
import LayoutWrapper from '@/layout/LayoutWrapper.vue'
import { ref } from 'vue'

const brand_id = ref(1)
const set_brand_id = (id: number) => (brand_id.value = id)
</script>

<template>
  <LayoutWrapper class="box-x as gap-8 max-sm:flex-col">
    <SectionBrands @set-brand-id="set_brand_id" :brand_id="brand_id" :link="false" />
    <SectionBrand :brand_id="brand_id" class="flex" />
  </LayoutWrapper>
</template>

<style lang="sass" scoped></style>
