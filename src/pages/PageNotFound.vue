<script setup lang="ts">
import FooterMain from '@/layout/footer/FooterMain.vue'
import LayoutPage from '@/layout/LayoutPage.vue'
</script>

<template>
  <LayoutPage class="main w relative">
    <div class="pa bg-black">
      <img
        class="img"
        src="@/assets/img/vladislav-bychkov-jnCvEQBPWmo-unsplash.jpg"
        alt="404_image"
      />
      <div class="absolute top-0 left-0 bg-black/70 w h" />
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
  </LayoutPage>
  <FooterMain />
</template>

<style lang="sass"></style>
