<script setup lang="ts">
import { filter as f } from '@/api/api'
import { computed, ref } from 'vue'
import StyleTypeDefault from '@/components/asides/filters/style-types/StyleTypeDefault.vue'
import StyleTypeColors from '@/components/asides/filters/style-types/StyleTypeColors.vue'

const props = defineProps(['filter'])

const active_filters_ids = computed(() => {
  return String(f.filters[filter.value.type]).split(',').map(Number) || []
})

const is_expand = ref<boolean | null>(null)

const MIN = 4

const filter = computed(() => props.filter || false)

const is_color = computed(() => filter.value.type === 'color')

const is_expand_validation = computed(() => !is_color.value && MIN < filter.value.content.length)

function send_active_filters_ids(content: Record<string, any>) {
  let _active_filters_ids = []
  _active_filters_ids.push(...active_filters_ids.value)

  const id = content.id
  if (!active_filters_ids.value.includes(id)) {
    _active_filters_ids.push(id)
  } else {
    _active_filters_ids = _active_filters_ids.filter((i) => i !== id)
  }

  f.filters = { [filter.value.type]: String(_active_filters_ids) }
}

function expand_change() {
  is_expand.value = !is_expand.value
}
</script>

<template>
  <StyleTypeColors
    v-if="is_color"
    @expand_change="expand_change"
    @send_active_filters_ids="send_active_filters_ids"
    :MIN="MIN"
    :is_expand_validation="is_expand_validation"
    :is_expand="is_expand"
    :filter="filter"
    :active_filters_ids="active_filters_ids"
  />

  <StyleTypeDefault
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
