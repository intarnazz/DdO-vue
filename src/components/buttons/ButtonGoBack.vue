<script setup lang="ts">
import IconChevronLeft from '@/components/icons/IconChevronLeft.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <button class="box-x a_sub" @click="router.back()">
    <IconChevronLeft />
    <strong>назад</strong>
  </button>
</template>

<style scoped lang="sass"></style>
