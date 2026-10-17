<script setup lang="ts">
// import { Type } from '@/api/api_domains/type/type'
import { types } from '@/api/api_domains/type/types'
import ProductNavItem from '@/layout/header/main/ProductNavItem.vue'
// import ProductNavSubContent from '@/layout/header/main/ProductNavSubContent.vue'
import LayoutWrapper from '@/layout/LayoutWrapper.vue'
import { onMounted } from 'vue'

// const { overlayIsOpen } = defineProps<{
//   overlayIsOpen: boolean
// }>()

// const emit = defineEmits<{
//   open_sub_content: [value: boolean]
// }>()

// const current_type = ref<null | Type>(null)

// function open_sub_content(boolean: boolean, type: Type): void {
//   if (boolean) current_type.value = type
//   else current_type.value = null

//   emit('open_sub_content', boolean)
// }

onMounted(() => types.load())
</script>

<template>
  <div class="">
    <div class="product-nav py-4 h- bs relative z-1">
      <LayoutWrapper>
        <div class="box-x gap-16">
          <nav class="box-x flex-1 js gap-8">
            <!-- <ProductNavItem
              v-for="type in types.items"
              :key="type.id"
              @open_sub_content="(boolean) => open_sub_content(boolean, type)"
              :type="type"
            /> -->
            <ProductNavItem v-for="type in types.items" :key="type.id" :type="type" />
          </nav>
          <RouterLink
            :to="{
              name: 'cart',
            }"
          >
            <img class="h-6" src="@/assets/icons/shopping.svg" alt="shopping" />
          </RouterLink>
        </div>
      </LayoutWrapper>
    </div>
    <!-- <ProductNavSubContent :type="current_type" :overlay-is-open="overlayIsOpen" /> -->
  </div>
</template>

<style lang="sass" scoped>
//
.select
  &__item
    &:hover
      background-color: $sub-95
.product-nav
  +g
</style>
