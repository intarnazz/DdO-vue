<script setup lang="ts">
import IconKeyboardArrowDown from '@/components/icons/IconKeyboardArrowDown.vue'
import { onClickOutside } from '@vueuse/core'
import { computed, ref } from 'vue'

interface Option {
  id: number
  name: string
}

const { options } = defineProps<{
  options: Option[]
}>()

const option_key = ref<number>(0)
const popup_is_open = ref(false)
const selectRef = ref(null)

onClickOutside(selectRef, () => {
  popup_is_open.value = false
})

const selected_option = computed(() => options[option_key.value])

function change_selected_option(new_key: number) {
  option_key.value = new_key
  popup_is_open.value = false
}
</script>

<template>
  <div ref="selectRef" class="gap-2 box-y select">
    <button
      @click="popup_is_open = !popup_is_open"
      class="select__button-selected box-x gap-4 p-2 px-4 border"
      :class="{ 'border-mark': popup_is_open }"
    >
      <span v-if="selected_option">
        {{ selected_option.id }} -
        {{ selected_option.name }}
      </span>
      <span v-else>Loading...</span>
      <IconKeyboardArrowDown />
    </button>
    <div class="relative h-0">
      <div
        :class="{ 'h-auto': popup_is_open, 'h-0': !popup_is_open }"
        class="select__popup shadow-xl overflow-hidden bg-white whitespace-nowrap"
      >
        <div class="select__list border box-y py-2">
          <button
            @click="change_selected_option(key)"
            class="select__item option px-4 py-2"
            v-for="(option, key) in options"
            :key="option.id"
          >
            <span>
              {{ option.id }} -
              {{ option.name }}
              <!-- 
            // TODO: выделение символов как в макете
            -->
            </span>
          </button>
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
  &__item
    &:hover
      background-color: $sub-95
</style>
