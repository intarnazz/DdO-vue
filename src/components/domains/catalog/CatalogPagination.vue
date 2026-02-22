<script setup lang="ts">
import { product } from '@/api/api'
import IconArrowCircleLeft from '@/components/icons/IconArrowCircleLeft.vue'
import IconArrowCircleRight from '@/components/icons/IconArrowCircleRight.vue'

function setPage(current_page: number) {
  product.current_page = current_page
}

function nextPage() {
  product.current_page++
}

function previousPage() {
  product.current_page--
}
</script>

<template>
  <div v-if="product.is_pagination" class="pagination font-normal box-x gap-4">
    <button
      :disabled="product.current_page === 1"
      @click="previousPage"
      class="pagination__right p-4"
    >
      <IconArrowCircleLeft
        :class="{
          'opacity-0': product.current_page === 1,
        }"
      />
    </button>
    <template v-for="(value, key) in product.pages" :key="key">
      <button
        v-if="
          (key === product.current_page - 4 && product.current_page === product.page_count) ||
          (key === product.current_page - 3 &&
            (product.current_page === product.page_count - 1 ||
              product.current_page === product.page_count)) ||
          key === product.current_page - 2 ||
          key === product.current_page - 1 ||
          key === product.current_page ||
          key === product.current_page + 1 ||
          (key === product.current_page + 2 && product.current_page === 1)
        "
        @click="setPage(value)"
        :class="{
          'pagination__current-page': product.current_page === value,
        }"
        class="pagination__page-button w-12.5 h-12.5 c-sub"
      >
        {{ value }}
      </button>
    </template>

    <button
      :disabled="product.current_page === product.page_count"
      @click="nextPage"
      class="pagination__right p-4"
    >
      <IconArrowCircleRight
        :class="{
          'opacity-0': product.current_page === product.page_count,
        }"
      />
    </button>
  </div>
</template>

<style lang="sass" scoped>
//
.pagination
  &__page-button
    border-radius: 5px
    border: 1px solid $sub-90
    &:hover
      border: 1px solid $mark
      color: $b
  &__current-page
    border: 1px solid $main
    color: $b
</style>
