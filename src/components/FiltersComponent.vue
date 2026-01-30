<script setup>
import { type } from '@/api/api'
</script>

<template>
  <div class="filter__list box-y">
    <div v-for="(filter, key) in type.value.filters" :key="key" class="filter p-4 box-y gap">
      <h3>{{ filter.name }}</h3>
      <div class="box-y gap">
        <div v-for="(default_content, key) in filter.default_content" :key="key" class="">
          <p>{{ default_content.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
//
.filter
  border: 1px solid $sub-90
  border-bottom: none
  &:first-child
    border-top-left-radius: 5px
    border-top-right-radius: 5px
  &:last-child
    border-bottom: 1px solid $sub-90
    border-bottom-left-radius: 5px
    border-bottom-right-radius: 5px
</style>
