<script setup>
import { filter as f } from '@/api/api'
import { computed, onMounted, ref } from 'vue'
import IconKeyboardArrowUp from '@/components/icons/IconKeyboardArrowUp.vue'
import ComponentFilter from '@/components/ComponentFilter.vue'

const props = defineProps(['filter'])
const active_filters_ids = ref([])
const is_expand = ref(null)

const filter = computed(() => props.filter || false)

onMounted(() => {
  if (f.filters[filter.value.type]) {
    active_filters_ids.value.push(...f.filters[filter.value.type].split(',').map(Number))
  }
})

function send_active_filters_ids(content) {
  const id = content.id

  if (!active_filters_ids.value.includes(id)) {
    active_filters_ids.value.push(id)
  } else {
    active_filters_ids.value = active_filters_ids.value.filter((i) => i !== id)
  }
  f.filters = { [filter.value.type]: String(active_filters_ids.value) }
}
</script>

<template>
  <div v-if="filter" class="filter pt-4 pb-2 box-y gap-2">
    <button @click="() => (is_expand = !is_expand)" class="box-x px-4 gap-2 filter__expand-button">
      <div
        :class="{
          expand: is_expand,
          expand_off: is_expand === false,
        }"
        class="filter__expand-button-icon-wrapper w-5.5 h-5.5 center"
      >
        <IconKeyboardArrowUp class="filter__expand-button-icon" />
      </div>
      <h3>{{ filter.name }}</h3>
      <div class="flex"></div>
    </button>
    <div class="box-y">
      <template v-for="(content, key) in filter.content" :key="key">
        <ComponentFilter
          v-if="
            key < 4 || is_expand || content.is_visible || active_filters_ids.includes(content.id)
          "
          :content="content"
          :active_filters_ids="active_filters_ids"
          @send_active_filters_ids="(content) => send_active_filters_ids(content)"
        />
      </template>
    </div>
  </div>
</template>

<style lang="sass" scoped>
//
.filter
  border: 1px solid $sub-90
  border-bottom: none
  &__expand-button-icon-wrapper
    border-radius: 100px
  &__expand-button
    &:hover
      color: $mark
  &:first-child
    border-top-left-radius: 5px
    border-top-right-radius: 5px
  &:last-child
    border-bottom: 1px solid $sub-90
    border-bottom-left-radius: 5px
    border-bottom-right-radius: 5px

.expand
    animation: expand .125s forwards ease-in

.expand_off
  animation: expand_off .125s forwards ease-in

@keyframes expand_off
  0%
    opacity: 100%
    transform: rotate(180deg);
  50%
    opacity: 0%
  100%
    transform: rotate(0deg);
    opacity: 100%

@keyframes expand
  0%
    transform: rotate(0deg);
  50%
    opacity: 0%
  100%
    opacity: 100%
    transform: rotate(-180deg);
</style>
