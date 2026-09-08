<script setup lang="ts">
import { product, user } from '@/api/api'
import { Image } from '@/api/local_domains/catalog/product/types'
import ComponentImg from '@/components/ComponentImg.vue'
import ComponentOpenImage from '@/components/ComponentOpenImage.vue'
import interior_is_valid from '@/components/sections/products/interior_is_valid.use'
import ProductGallery from '@/components/sections/products/ProductGallery.vue'
import LayoutIcon from '@/layout/LayoutIcon.vue'
import { Ref, ref } from 'vue'

const current_image: Ref<Image | Image[] | null> = ref(null)
const index: Ref<number> = ref(0)

const set_current_image = (image: null | Image | Image[], key: number = 0) => {
  current_image.value = image
  index.value = key
}
</script>

<template>
  <div class="product__left-box box-y flex-1 gap-16 relative">
    <LayoutIcon v-slot="{ active, active_on, active_off }" :active="user.interior_is_active.value">
      <div
        :class="{
          'opacity-100': active,
          'opacity-0': !active,
          interior_active_on: active_on,
          interior_active_off: active_off,
        }"
        class="absolute top-0 left-0 h-162.5 w-full -mt-8"
      >
        <img
          v-if="interior_is_valid"
          class="h-full img br"
          src="@/assets/img/product_image_bg.webp"
          alt="product_image_bg"
        />
      </div>
    </LayoutIcon>

    <div class="box-x gap-4 relative content center">
      <div
        v-if="!user.interior_is_active.value || !product.product.image_secondary"
        class="box-x relative product__img-wrapper"
      >
        <ComponentImg
          v-if="product.product.image_primary.path"
          @click="set_current_image(product.product.image_primary)"
          :class="{
            product__img_shadow: !interior_is_valid || !user.interior_is_active.value,
          }"
          class="product__img object-cover max-h-132.5 cursor-zoom-in"
          :storage="product.product.image_primary.path"
        />
      </div>
      <div v-if="product.product.image_secondary" class="box-x relative product__img-wrapper">
        <ComponentImg
          v-if="product.product.image_primary.path"
          @click="set_current_image(product.product.image_secondary)"
          :class="{
            product__img_shadow: !user.interior_is_active.value,
          }"
          class="product__img object-cover max-h-132.5 w-full cursor-zoom-in"
          :storage="product.product.image_secondary.path"
        />
      </div>
    </div>

    <ComponentOpenImage
      v-if="current_image"
      @close="set_current_image(null)"
      :image="current_image"
      :index="index"
    />

    <ProductGallery @set_current_image="set_current_image" />
  </div>
</template>

<style lang="sass" scoped>
//
.product
  &__img-wrapper
    position: relative;
    display: inline-block;

    &::after
      content: '';
      position: absolute;
      z-index: 0;
      left: 50%;
      bottom: -12px;
      width: 100%;
      height: 12px;
      background: $b-50;
      filter: blur(10px);
      border-radius: 50%;
      transform: translateX(-50%);

  &__img
      position: relative;
      z-index: 1
  //   &_shadow
  //     filter: drop-shadow(0px 15px 20px $b-50);

.interior_active_on
  animation: interior_active_on .125s forwards ease-in

.interior_active_off
  animation: interior_active_off .125s forwards ease-in

@keyframes interior_active_on
  0%
    opacity: 0%
  100%
    opacity: 100%
@keyframes interior_active_off
  0%
    opacity: 100%
  100%
    opacity: 0%
</style>
