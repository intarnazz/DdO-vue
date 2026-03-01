<script setup lang="ts">
import ComponentImg from '@/components/ComponentImg.vue'
</script>

<template>
  <section class="home">
    <ComponentImg :id="14" class="h-dvh object-cover" />
  </section>
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
