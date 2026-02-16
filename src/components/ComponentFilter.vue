<script setup>
import { computed, ref } from 'vue'
import ButtonFilterCheckBox from '@/components/buttons/ButtonFilterCheckBox.vue'
import ButtonColorCheckBox from '@/components/buttons/ButtonColorCheckBox.vue'

const props = defineProps(['content', 'active_filters_ids', 'is_color'])
const emit = defineEmits(['send_active_filters_ids'])

const __is_active = ref(null)

const content = computed(() => props.content || {})
const active_filters_ids = computed(() => props.active_filters_ids || [])

const is_active = computed(() =>
  active_filters_ids.value.includes(content.value.id)
    ? true
    : __is_active.value === null
      ? null
      : false,
)

function send_active_filters_ids() {
  __is_active.value = true
  emit('send_active_filters_ids', content.value)
}
</script>

<template>
  <ButtonColorCheckBox
    v-if="props.is_color"
    @send_active_filters_ids="send_active_filters_ids"
    :content="content"
    :is_active="is_active"
  />



  <ButtonFilterCheckBox
    v-else
    @send_active_filters_ids="send_active_filters_ids"
    :content="content"
    :is_active="is_active"
  />
</template>

<style lang="sass" scoped>
//
</style>
