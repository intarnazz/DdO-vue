<script setup>
import HeaderMain from '@/layout/header/HeaderMain.vue'
import { useRoute } from 'vue-router'
import { watchEffect } from 'vue'
import HeaderWhopper from '@/layout/header/HeaderWhopper.vue'

const route = useRoute()

watchEffect(() => {
  document.title = route.meta.title || 'Двери да Окна здесь'
  const description = route.meta.description
  const metaDescription = document.querySelector('meta[name="description"]')
  if (metaDescription) {
    metaDescription.setAttribute('content', description || 'Default description')
  }
})
</script>

<template>
  <HeaderMain class="media-header cansel" />
  <HeaderWhopper class="media-header open" />
  <RouterView />
</template>

<style lang="sass" scoped></style>
