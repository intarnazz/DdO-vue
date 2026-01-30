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
        class="filter__button py-2 px-4 box-x gap-2"
        :class="{ active: filters.includes(default_content.id) }"
      >
        <div
          :class="{
            active: filters.includes(default_content.id),
            off: !filters.includes(default_content.id),
          }"
          class="filter__checkbox w-5.5 h-5.5"
        >
          <img
            :class="{
              hidden: !filters.includes(default_content.id),
            }"
            src="@/assets/icons/check_small.svg"
            alt=""
          />
        </div>
        <p>
          {{ default_content.name }}
        </p>
        <div class="flex"></div>
      </botton>
    </div>
  </div>
</template>

<style lang="sass" scoped>
//
.filter
  border: 1px solid $sub-90
  border-bottom: none
  &__checkbox
    border: 1px solid $sub
    border-radius: 5px
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

.active
  &.filter
    &__checkbox
      // background-color: $main
      // box-shadow: 0 0 10px 0 $main
      // border: none
      animation: active .125s forwards linear

.off
  animation: off .125s forwards linear


@keyframes active
  0%
    border: 1px solid $sub
    border-radius: 5px
    box-shadow: 0 0 0px 0 $main
    margin-bottom: -1rem
  100%
    background-color: $main
    box-shadow: 0 0 10px 0 $main
    border: none
    margin-bottom: 0rem

@keyframes off
  0%
    background-color: $main
    box-shadow: 0 0 10px 0 $main
    border: none
    margin-bottom: -1rem
  100%
    border: 1px solid $sub
    border-radius: 5px
    box-shadow: 0 0 0px 0 $main
    margin-bottom: 0rem
</style>
