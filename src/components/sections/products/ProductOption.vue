<script setup lang="ts">
import { product } from '@/api/api'
import ButtonAddToCart from '@/components/buttons/ButtonAddToCart.vue'
import IconChevronLeft from '@/components/icons/IconChevronLeft.vue'
import IconChevronRight from '@/components/icons/IconChevronRight.vue'
</script>

<template>
  <section class="box-y gap-8">
    <p class="c-sub">
      donec volutpat turpis tellus, a pretium velit semper nec. Quisque sed egestas tortor.
    </p>

    <div class="br"></div>

    {{ product.product.options }}

    <IconChevronLeft />
    <IconChevronRight />

    <ButtonAddToCart :product="product.product" />
  </section>
</template>

<style lang="sass" scoped></style>
