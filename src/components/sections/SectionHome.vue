<script setup lang="ts">
import IconLogo from '@/components/icons/IconLogo.vue'
import LayoutWrapper from '@/layout/LayoutWrapper.vue'

// import ComponentSlider from '@/components/ComponentSlider.vue'

// import slider_image_1 from '@/assets/img/Без названия (10).webp'
// import slider_image_2 from '@/assets/img/Без названия (1).webp'
// import slider_image_3 from '@/assets/img/2342342342.webp'
// import slider_image_4 from '@/assets/img/534535345.webp'
</script>

<template>
  <section class="home w">
    <div class="w relative">
      <div class="absolute w h">
        <div class="w h py-8 c-w bg-linear-to-b from-black/60 to-black/40 max-w-480 m-auto">
          <LayoutWrapper>
            <h1>Двери да Окна здесь</h1>
          </LayoutWrapper>
        </div>
      </div>
      <img class="img m-auto w max-w-480" src="@/assets/img/main-baner.JPG" alt="main-baner" />
    </div>

    <!-- <ComponentSlider
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
    /> -->
  </section>
</template>
