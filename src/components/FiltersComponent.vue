<script setup>
import { type, filter as f } from '@/api/api'
</script>

<template>
  <div class="filter__list box-y">
    <div
      v-for="(filter, key) in type.value.filters"
      :key="key"
      class="filter pt-4 pb-2 box-y gap-2"
    >
      <h3 class="px-4">{{ filter.name }}</h3>
      <div class="box-y">
        <botton
          @click="() => (f.filters = { [filter.type]: default_content.id })"
          v-for="(default_content, key) in filter.default_content"
          :key="key"
          class="filter__button py-2 px-4"
          >{{ default_content.name }}</botton
        >
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
//
.filter
  border: 1px solid $sub-90
  border-bottom: none
  &__button
    cursor: pointer
    &:hover
      background-color: $sub-95
  &:first-child
    border-top-left-radius: 5px
    border-top-right-radius: 5px
  &:last-child
    border-bottom: 1px solid $sub-90
    border-bottom-left-radius: 5px
    border-bottom-right-radius: 5px
</style>
