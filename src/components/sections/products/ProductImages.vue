<script setup lang="ts">
import { product, user } from '@/api/api'
import { Image } from '@/api/local_domains/catalog/product/types'
import ComponentImg from '@/components/ComponentImg.vue'
import ComponentOpenImage from '@/components/ComponentOpenImage.vue'
import interior_is_valid from '@/components/sections/products/interior_is_valid.use'
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
        class="box-x relative h-132.5"
      >
        <ComponentImg
          v-if="product.product.image_primary.path"
          @click="set_current_image(product.product.image_primary)"
          :class="{
            product__img_shadow: !interior_is_valid || !user.interior_is_active.value,
          }"
          class="product__img object-cover h-full cursor-zoom-in"
          :storage="product.product.image_primary.path"
        />
      </div>
      <div v-if="product.product.image_secondary" class="box-x relative h-132.5">
        <ComponentImg
          v-if="product.product.image_primary.path"
          @click="set_current_image(product.product.image_secondary)"
          :class="{
            product__img_shadow: !user.interior_is_active.value,
          }"
          class="product__img object-cover h-full w-full cursor-zoom-in"
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

    <div class="product__image-list relative">
      <div
        v-for="(image, key) in product.product.images"
        :key="image.id"
        @click="set_current_image(product.product.images, key)"
        class="h-25 product__image-list-item center cursor-zoom-in box br"
      >
        <ComponentImg class="br h-full object-cover" :id="image.id" :max_h="100" />
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
//
.product
  &__image-list
    display: grid
    gap: 1rem
    grid-template-columns: repeat( auto-fill, minmax( 6.72rem , 1fr ) )
  &__img
    &_shadow
      box-shadow: 0px 15px 20px 0px $b-50

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
