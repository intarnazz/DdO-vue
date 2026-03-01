<script setup lang="ts">
import ComponentImg from '@/components/ComponentImg.vue'
</script>

<template>
  <div class="pa bg-black">
    <ComponentImg :id="1" />
  </div>
  <div class="h-dvh center relative">
    <div class="box-y text-white">
      <h1>
        404 <br />
        Тут ничего нет! O_O
      </h1>
      <RouterLink :to="{ name: 'home' }" class="a a_w"><h3>← Назад на сайт</h3></RouterLink>
    </div>
  </div>
</template>

<style lang="sass"></style>
