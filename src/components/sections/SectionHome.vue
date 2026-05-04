<script setup lang="ts">
import ComponentSlider from '@/components/ComponentSlider.vue'
</script>

<template>
  <section class="home">
    <ComponentSlider
      :banners="[
        {
          image: 'src/assets/img/Без названия (10).jpg',
          title: 'тут мог быть ваш банер',
          subtitle: 'Подзаголовок',
          tag: 'Новинка',
        },
        {
          image: 'src/assets/img/Без названия (1).jpg',
          title: 'тут мог быть ваш банер',
          subtitle: 'Подзаголовок',
          tag: 'Новинка',
        },
        {
          tag: 'товары',
          title: 'тут тоже мог быть ваш банер',
          image: 'src/assets/img/2342342342.jpg',
        },
        {
          tag: 'товары',
          title: 'тут тоже мог быть ваш банер',
          image: 'src/assets/img/534535345.jpg',
        },
      ]"
      :autoplay-delay="4000"
    />
  </section>
</template>
