<script setup>
import { filter as f } from '@/api/api'
import { computed, ref } from 'vue'

const props = defineProps(['filter'])
const filters = ref([])

const filter = computed(() => props.filter || false)

function send_filters(id) {
  if (!filters.value.includes(id)) {
    filters.value.push(id)
  } else {
    filters.value = filters.value.filter((i) => i !== id)
  }
  f.filters = { [filter.value.type]: String(filters.value) }
}
</script>

<template>
  <div v-if="filter" class="filter pt-4 pb-2 box-y gap-2">
    <h3 class="px-4">{{ filter.name }}</h3>
    <div class="box-y">
      <botton
        @click="send_filters(default_content.id)"
        v-for="(default_content, key) in filter.default_content"
        :key="key"
        class="filter__button py-2 px-4"
        >{{ default_content.name }}</botton
      >
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
