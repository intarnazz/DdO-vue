<script setup lang="ts">
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
        <div class="w h py-8 c-w bg-linear-to-b from-black/0 to-black/55 max-w-480 m-auto">
          <LayoutWrapper class="box-y h">
            <!-- <div class="box-y gap-4">
              <h1>Двери да Окна здесь</h1>
              <p class="max-w-[50%] c-sub-90">
                Мы предлагаем качественные входные и межкомнатные двери для дома и бизнеса.
                Подбираем решения под ваш стиль и бюджет, обеспечиваем консультацию, замер и
                установку.
              </p>
            </div>

            <div class="box-x">
              <div class="flex-1" />
              <RouterLink :to="{ name: 'contact' }" class="stores__link">
                <LayoutButton>
                  <IconLocationOn />
                  <strong>На карте</strong>
                </LayoutButton>
              </RouterLink>
            </div> -->

            <div class="w h flex items-center">
              <div class="flex flex-col items-start justify-end gap-4 text-xs">
                <span class="rounded-full bg-white/20 px-4 py-2"> всё для дома </span>
                <div class="box-y gap-2">
                  <p class="text-4xl">Двери да Окна Здесь</p>
                  <p>магазин дверей</p>
                </div>
              </div>
            </div>
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
