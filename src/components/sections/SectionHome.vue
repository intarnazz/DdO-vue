<script setup lang="ts">
import ComponentSlider from '@/components/ComponentSlider.vue'

import slider_image_1 from '@/assets/img/Без названия (10).webp'
import slider_image_2 from '@/assets/img/Без названия (1).webp'
import slider_image_3 from '@/assets/img/2342342342.webp'
import slider_image_4 from '@/assets/img/534535345.webp'
</script>

<template>
  <section class="home">
    <ComponentSlider
      :banners="[
        {
          image: slider_image_1,
          title: 'тут мог быть ваш банер',
          subtitle: 'Подзаголовок',
          tag: 'Новинка',
        },
        {
          image: slider_image_2,
          title: 'тут мог быть ваш банер',
          subtitle: 'Подзаголовок',
          tag: 'Новинка',
        },
        {
          tag: 'товары',
          title: 'тут тоже мог быть ваш банер',
          image: slider_image_3,
        },
        {
          tag: 'товары',
          title: 'тут тоже мог быть ваш банер',
          image: slider_image_4,
        },
      ]"
      :autoplay-delay="4000"
    />
  </section>
</template>
