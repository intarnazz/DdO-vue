<script setup lang="ts">
import ComponentRecolorText from '@/components/ComponentRecolorText.vue'
import IconKeyboardArrowDown from '@/components/icons/IconKeyboardArrowDown.vue'
import LayoutPopup from '@/layout/LayoutPopup.vue'
import { computed, ref } from 'vue'

interface Option {
  id: number
  name: string
}

const { options } = defineProps<{
  options: Option[]
}>()

const option_key = ref<number>(0)

const selected_option = computed(() => options[option_key.value])

function change_selected_option(new_key: number) {
  option_key.value = new_key
}
</script>

<template>
  <!-- @vue-generic {number} -->
  <LayoutPopup @change_selected_option="change_selected_option">
    <template #button>
      <div class="select__button-selected box-x gap-4 p-2 px-4 border">
        <span v-if="selected_option">
          <ComponentRecolorText :text="`${selected_option.id} - ${selected_option.name}`" />
        </span>
        <span v-else>Loading...</span>
        <IconKeyboardArrowDown />
      </div>
    </template>

    <template #content="{ change_selected_option }">
      <button
        @click="change_selected_option(key)"
        class="select__item option px-4 py-2"
        v-for="(option, key) in options"
        :key="option.id"
      >
        <span>
          <ComponentRecolorText :text="`${option.id} - ${option.name}`" />
        </span>
      </button>
    </template>
  </LayoutPopup>
</template>

<style lang="sass" scoped>
//
.select
  &__item
    &:hover
      background-color: $sub-95
</style>
