<script setup lang="ts">
import FilterList from '@/components/asides/filters/FilterList.vue'
import AsideTags from '@/components/asides/AsideTags.vue'
import { ref } from 'vue'
import { useToggle } from '@vueuse/core'
import { up } from '@/utilte/utilte'

const is_visible = ref(false)
const visibleToggle = useToggle(is_visible)
</script>

<template>
  <div
    @click="() => (up(), visibleToggle())"
    class="button__wrapper sm:hidden fixed z-2 top-0 right-0 p-8"
  >
    <button class="bg-mark shadow-xl c-w rounded-full w-15 h-15">F</button>
  </div>

  <aside
    :class="{
      'max-sm:flex': is_visible,
      'max-sm:hidden': !is_visible,
    }"
    class="filters flex flex-col gap-8 js max-sm:absolute max-sm:top-4 max-sm:left-4 max-sm:bg-white max-sm:z-2 max-sm:shadow-xl"
  >
    <AsideTags />
    <FilterList />
  </aside>
</template>

<style lang="sass" scoped>
//Z
</style>
