<script setup lang="ts" generic="T">
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'

const { css_class = 'relative' } = defineProps<{
  css_class?: string
}>()

const emit = defineEmits<{
  change_selected_option: [value: T]
}>()

const popup_is_open = ref(false)
const selectRef = ref(null)

onClickOutside(selectRef, () => {
  popup_is_open.value = false
})

function change_selected_option(value: T) {
  popup_is_open.value = false
  emit('change_selected_option', value)
}
</script>

<template>
  <div ref="selectRef" class="gap-2 box-y select relative">
    <button @click="popup_is_open = !popup_is_open" :class="{ 'border-mark': popup_is_open }">
      <slot name="button" />
    </button>
    <div :class="[css_class]" class="z-1 h-0">
      <div
        :class="{ 'h-auto': popup_is_open, 'h-0': !popup_is_open }"
        class="select__popup shadow-xl overflow-hidden whitespace-nowrap"
      >
        <div class="select__list border box-y py-2 bg-white">
          <slot name="content" :change_selected_option="change_selected_option" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
//
.select
  &__button-selected
    &:focus
      border: 1px solid $mark
</style>
