<script setup>
import Iconlogo from '@/components/icons/Iconlogo.vue'
import LayoutWrapper from '@/layout/LayoutWrapper.vue'
</script>
<template>
  <footer class="footer py-16">
    <LayoutWrapper>
      <Iconlogo :fill="`#ffffff`" />
    </LayoutWrapper>
  </footer>
</template>

<style lang="sass" scoped>
//
.footer
  background-color: $b
</style>
