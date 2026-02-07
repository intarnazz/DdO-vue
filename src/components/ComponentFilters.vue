<script setup>
import { filter as f } from '@/api/api'
import { computed, onMounted, ref } from 'vue'

import FilterList from '@/components/asides/filters/FilterList.vue'
import FilterColors from '@/components/asides/filters/FilterColors.vue'

const props = defineProps(['filter'])
const active_filters_ids = ref([])
const is_expand = ref(null)

const MIN = 4

const filter = computed(() => props.filter || false)

const is_color = computed(() => filter.value.type === 'color')

const is_expand_validation = computed(() => !is_color.value && MIN < filter.value.content.length)

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

function expand_change() {
  is_expand.value = !is_expand.value
}
</script>

<template>
  <FilterColors
    v-if="is_color"
    @expand_change="expand_change"
    @send_active_filters_ids="send_active_filters_ids"
    :MIN="MIN"
    :is_expand_validation="is_expand_validation"
    :is_expand="is_expand"
    :filter="filter"
    :active_filters_ids="active_filters_ids"
  />

  <FilterList
    v-else
    @expand_change="expand_change"
    @send_active_filters_ids="send_active_filters_ids"
    :MIN="MIN"
    :is_expand_validation="is_expand_validation"
    :is_expand="is_expand"
    :filter="filter"
    :active_filters_ids="active_filters_ids"
  />
</template>

<style lang="sass" scoped>
//
</style>
