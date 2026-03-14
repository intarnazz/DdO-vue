<script setup lang="ts">
import IconKeyboardArrowDown from '@/components/icons/IconKeyboardArrowDown.vue'
import { useFocus } from '@vueuse/core'
import { computed, ref } from 'vue'

interface Option {
  id: number
  name: string
}

const { options } = defineProps<{
  options: Option[]
}>()

const option_key = ref<number>(0)
const buttonSelected = ref(null)

const { focused: popup_is_open } = useFocus(buttonSelected)

const selected_option = computed(() => options[option_key.value])

function change_selected_option(new_key: number) {
  option_key.value = new_key
}
</script>

<template>
  <div class="gap-2 box-y select">
    <button
      v-if="selected_option"
      ref="buttonSelected"
      class="select__button-selected box-x gap-4 p-2 px-4 border"
    >
      <span>
        <!-- 
        //TODO: нужен leading
        -->
        {{ selected_option.id }} -
        {{ selected_option.name }}
      </span>
      <IconKeyboardArrowDown />
    </button>
    <div class="relative h-0">
      <div
        :class="{
          'h-auto': popup_is_open,
          'h-0': !popup_is_open,
        }"
        class="select__popup shadow-xl overflow-hidden bg-white whitespace-nowrap"
      >
        <div class="select__list border box-y py-1">
          <button
            @mousedown="change_selected_option(key)"
            class="select__item option px-4 py-1"
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
