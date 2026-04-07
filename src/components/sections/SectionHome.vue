<script setup lang="ts">
import ComponentSlider from '@/components/ComponentSlider.vue'
</script>

<template>
  <section class="home">
    <ComponentSlider
      :banners="[
        {
          id: 1,
          image: 'src/assets/img/2025-11-21_09-05-42.png',
          title: 'тут мог быть ваш банер',
          subtitle: 'Подзаголовок',
          tag: 'Новинка',
        },
        {
          id: 2,
          tag: 'Акция',
          title: 'Скидки до 40% на двери',
          image: 'src/assets/img/2025-11-15_08-48-03.png',
        },
        {
          id: 3,
          tag: 'товары',
          title: 'тут тоже мог быть ваш банер',
          image: 'src/assets/img/2025-12-10_19-12-57.png',
        },
        {
          id: 4,
          tag: 'товары',
          title: 'тут тоже мог быть ваш банер',
          image: 'src/assets/img/2025-12-04_18-00-15.png',
        },
        {
          id: 5,
          tag: 'товары',
          title: 'тут тоже мог быть ваш банер',
          image: 'src/assets/img/2025-07-01_19-20-00.png',
        },
        {
          id: 6,
          tag: 'товары',
          title: 'тут тоже мог быть ваш банер',
          image: 'src/assets/img/2025-06-25_18-58-33.png',
        },
      ]"
      :autoplay-delay="4000"
    />
  </section>
</template>
