<script setup lang="ts">
import FilterList from '@/components/asides/filters/FilterList.vue'
import AsideTags from '@/components/asides/AsideTags.vue'
import { ref } from 'vue'
import { useToggle } from '@vueuse/core'

const is_visible = ref(false)
const visibleToggle = useToggle(is_visible)
</script>

<template>
  <div @click="() => visibleToggle()" class="button__wrapper sm:hidden fixed z-2 top-0 right-0 p-8">
    <button class="bg-mark shadow-xl c-w rounded-full w-15 h-15">F</button>
  </div>

  <aside
    @click="visibleToggle(false)"
    :class="{
      'max-sm:flex': is_visible,
      'max-sm:hidden': !is_visible,
    }"
    class="filters flex flex-col gap-8 js max-sm:fixed max-sm:top-0 max-sm:left-0 max-sm:z-2 max-sm:bg-black/70 max-sm:p-4 max-sm:pb-32 max-sm:h-full max-sm:w-full max-sm:overflow-scroll"
  >
    <AsideTags @click.stop />
    <FilterList @click.stop class="bg-white br max-sm:w-1/2" />
  </aside>
</template>

<style lang="sass" scoped></style>
