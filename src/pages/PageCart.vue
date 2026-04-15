<script setup lang="ts">
import { cart } from '@/api/api';
import FooterMain from '@/layout/footer/FooterMain.vue'
import LayoutPage from '@/layout/LayoutPage.vue'
import LayoutWrapper from '@/layout/LayoutWrapper.vue'
</script>

<template>
  <LayoutPage class="main w">
    <LayoutWrapper>
      <section class="cart">
        <h2>cart</h2>
        {{ cart.products }}
      </section>
    </LayoutWrapper>
  </LayoutPage>
  <FooterMain />
</template>

<style lang="sass" scoped></style>
