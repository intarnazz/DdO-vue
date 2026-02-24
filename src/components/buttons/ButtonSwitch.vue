<script setup>
import { computed, ref } from 'vue'
import IconKeyboardArrowUp from '@/components/icons/IconKeyboardArrowUp.vue'
import { filter } from '@/api/api'

const props = defineProps(['button', 'index', 'active'])
const emit = defineEmits(['click'])

const is_hover = ref(null)

const button = computed(() => props.button || {})
const key = computed(() => props.index ?? NaN)
const active = computed(() => props.active || false)

const is_active = computed(() => active.value === key.value)

const is_turn = ref(null)

const fill = computed(() => {
  if (is_hover.value) return 'mark'
  if (!is_active.value) return 'sub'
  return ''
})

const desc = computed(() => {
  if (is_turn.value) return 'desc'
  return ''
})

function emit_click() {
  if (is_active.value && button.value.turn === true) {
    is_turn.value = !filter.desc
    button.value.desc = desc.value
  }
  emit('click')
}
</script>

<template>
  <button
    @click="emit_click"
    @mouseenter="is_hover = true"
    @mouseleave="is_hover = false"
    class="box-x gap-1 switch-button"
  >
    <span>
      {{ button.text }}
    </span>
    <IconKeyboardArrowUp
      v-if="button.turn === true"
      :is_turn="is_turn"
      :default_turn="is_active ? Boolean(filter.desc) : Boolean(button.desc)"
      :fill="fill"
      class="-mb-0.75"
    />
  </button>
</template>

<style lang="sass" scoped>
//
</style>
