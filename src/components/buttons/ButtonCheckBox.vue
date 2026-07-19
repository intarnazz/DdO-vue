<script setup lang="ts">
import { computed, ref } from 'vue'
import CheckBoxColor from './check-boxes/CheckBoxColor.vue'
import CheckBoxFilter from './check-boxes/CheckBoxMain.vue'

const props = defineProps(['content', 'active_filters_ids', 'is_color'])
const emit = defineEmits(['send_active_filters_ids'])

const __is_active = ref<boolean | null>(null)

const content = computed(() => props.content || {})
const active_filters_ids = computed(() => props.active_filters_ids || [])

// content.ids — сгруппированный цвет (несколько исходных id под одним чекбоксом);
// если ids нет — обычный фильтр с одним content.id, как было раньше
const content_ids = computed<number[]>(() =>
  Array.isArray(content.value.ids) ? content.value.ids : [content.value.id],
)

const is_active = computed(() => {
  const has_active = content_ids.value.some((id: number) => active_filters_ids.value.includes(id))
  return has_active ? true : __is_active.value === null ? null : false
})

function send_active_filters_ids() {
  __is_active.value = true
  emit('send_active_filters_ids', content.value)
}
</script>

<template>
  <CheckBoxColor
    v-if="props.is_color"
    @send_active_filters_ids="send_active_filters_ids"
    :content="content"
    :is_active="is_active"
  />

  <CheckBoxFilter
    v-else
    @send_active_filters_ids="send_active_filters_ids"
    :content="content"
    :is_active="is_active"
  />
</template>

<style lang="sass" scoped>
//
</style>