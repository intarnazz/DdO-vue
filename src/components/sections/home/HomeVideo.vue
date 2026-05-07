<script setup lang="ts">
import LayoutWrapper from '@/layout/LayoutWrapper.vue'
</script>

<template>
  <section class="home-video w">
    <LayoutWrapper>
      <div class="w flex gap-4 py-4 items-center max-sm:flex-col">
        <div class="text-center box-y gap-4 flex-1">
          <h2>Проект “Ставим двери вместе”</h2>
          <p class="font-normal">
            Магазин «Двери да окна здесь» предлагает готовые к установке двери, которые легко
            установить самостоятельно — без лишних затрат на монтаж. Вы экономите деньги и время,
            получая качественный результат. Проект «Ставим двери вместе» — это удобство, доступность
            и гарантия качества.
          </p>
        </div>
        <div class="flex-1 flex">
          <iframe
            :src="`https://rutube.ru/play/embed/0e3265c50a66f367a18fc3367b790bbf`"
            frameborder="0"
            allow="autoplay; fullscreen"
            allowfullscreen
            class="flex-1 min-h-87"
          >
          </iframe>
        </div>
      </div>
    </LayoutWrapper>
  </section>
</template>

<style lang="sass" scoped>
.home-video
  +g
</style>
