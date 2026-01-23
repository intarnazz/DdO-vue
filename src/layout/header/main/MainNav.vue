<script setup>
import LayoutWrapper from '@/layout/LayoutWrapper.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <div v-if="!isLoding" class="address py-[1rem]">
    <LayoutWrapper>
      <div class="box-x">
        <img class="h-11" src="@/assets/icons/logo.svg" alt="logo" />

        <div class="box-x gap2">
          <RouterLink :to="{ name: 'home' }" class="a">
            <p>главная</p>
          </RouterLink>
          <RouterLink :to="{ name: 'home' }" class="a">
                        <p>главная</p>

          </RouterLink>
        </div>
      </div>
    </LayoutWrapper>
  </div>
</template>

<style lang="sass" scoped></style>
