<script setup lang="ts">
import { filter } from '@/api/api'
import { ref, watch } from 'vue'
import IconSearch from '../icons/IconSearch.vue'
import IconClose from '../icons/IconClose.vue'

const search = ref<string>(filter.search)

function submit() {
  filter.search = search.value.trim()
}

watch(() => search.value, submit)
</script>

<template>
  <form
    class="form search"
    :class="{
      flex: search !== '',
    }"
    @submit.prevent="submit"
  >
    <div class="search__input-wrapper min-w-53.25 w px-4 py-2 box-x gap-2">
      <input
        v-model="search"
        placeholder="поиск по каталогу..."
        name="search"
        type="text"
        class="search__input w"
      />
      <button @click="search = ''" :disabled="search === ''" type="button">
        <IconClose />
      </button>
      <button :disabled="search === ''" type="submit">
        <IconSearch />
      </button>
    </div>
  </form>
</template>

<style lang="sass" scoped>
//
.search
  transition: .3s
  &:has(&__input:focus)
    flex: 1
  &__input
  &__input-wrapper
    border-radius: 5px
    border: 1px solid $sub-90
</style>
