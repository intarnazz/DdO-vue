<script setup lang="ts" generic="T">
import IconKeyboardArrowDown from '@/components/icons/IconKeyboardArrowDown.vue'
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'

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
  <div ref="selectRef" class="gap-2 box-y select">
    <button
      @click="popup_is_open = !popup_is_open"
      class="select__button-selected box-x gap-4 p-2 px-4 border"
      :class="{ 'border-mark': popup_is_open }"
    >
      <slot name="button" />
      <IconKeyboardArrowDown />
    </button>
    <div class="relative z-1 h-0">
      <div
        :class="{ 'h-auto': popup_is_open, 'h-0': !popup_is_open }"
        class="select__popup shadow-xl overflow-hidden bg-white whitespace-nowrap"
      >
        <slot name="content" :change_selected_option="change_selected_option" />
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
