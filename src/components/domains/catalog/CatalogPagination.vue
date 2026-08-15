<script setup lang="ts">
import { computed } from 'vue'
import { product } from '@/api/api'
import IconArrowCircleLeft from '@/components/icons/IconArrowCircleLeft.vue'
import IconArrowCircleRight from '@/components/icons/IconArrowCircleRight.vue'

const { WINDOW_SIZE = 4 } = defineProps<{
  WINDOW_SIZE: number
}>()

function setPage(current_page: number) {
  product.current_page = current_page // valid
}

function nextPage() {
  product.current_page++ // valid
}

function previousPage() {
  product.current_page-- // valid
}

const ELLIPSIS = '...'
type PaginationItem = number | typeof ELLIPSIS

const paginationItems = computed<PaginationItem[]>(() => {
  const total = product.page_count
  const current = product.current_page

  let start = current - 1
  let end = start + WINDOW_SIZE - 1

  if (start < 1) {
    end += 1 - start
    start = 1
  }
  if (end > total) {
    start -= end - total
    end = total
  }

  start = Math.max(1, start)
  end = Math.min(total, end)

  const items: PaginationItem[] = []

  if (start > 1) {
    items.push(1)
    if (start > 2) items.push(ELLIPSIS)
  }

  for (let page = start; page <= end; page++) {
    items.push(page)
  }

  if (end < total) {
    if (end < total - 1) items.push(ELLIPSIS)
    items.push(total)
  }

  return items
})
</script>

<template>
  <div v-if="product.is_pagination" class="pagination font-normal box-x gap-4">
    <button
      aria-label="prev"
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

    <template v-for="(item, key) in paginationItems" :key="key">
      <button
        v-if="typeof item === 'number'"
        @click="setPage(item)"
        :class="{
          'pagination__current-page': product.current_page === item,
        }"
        :aria-current="product.current_page === item ? 'page' : undefined"
        :aria-label="`Страница ${item}`"
        class="pagination__page-button w-12.5 h-12.5 c-sub"
      >
        {{ item }}
      </button>
      <span v-else class="pagination__ellipsis w-12.5 h-12.5 c-sub" aria-hidden="true">
        {{ item }}
      </span>
    </template>

    <button
      aria-label="next"
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
  &__ellipsis
    display: flex
    align-items: center
    justify-content: center
    cursor: default
</style>
