<script setup lang="ts">
import IconKeyboardArrowUp from '@/components/icons/IconKeyboardArrowUp.vue'
import ButtonCheckBox from '@/components/buttons/ButtonCheckBox.vue'

const props = defineProps(['is_expand_validation', 'is_expand', 'filter', 'active_filters_ids'])
const emit = defineEmits(['expand_change', 'send_active_filters_ids'])

function expand_change() {
  emit('expand_change')
}

function send_active_filters_ids(content) {
  emit('send_active_filters_ids', content)
}
</script>

<template>
  <div class="filter pt-4 pb-2 box-y gap-2">
    <button
      @click="expand_change"
      class="box-x px-4 gap-2 filter__expand-button"
      :class="{
        'filter__expand-button_hover': props.is_expand_validation,
      }"
      type="button"
      :disabled="!props.is_expand_validation"
    >
      <div
        :class="{
          expand: props.is_expand,
          expand_off: props.is_expand === false,
        }"
        v-if="props.is_expand_validation"
        class="filter__expand-button-icon-wrapper w-5.5 h-5.5 center"
      >
        <IconKeyboardArrowUp class="filter__expand-button-icon" />
      </div>
      <strong>{{ props.filter.name }}</strong>
      <div class="flex"></div>
    </button>
    <div class="box-x px-4">
      <div class="filter__grid py-2 gap-4">
        <template v-for="(content, key) in props.filter.content" :key="key">
          <ButtonCheckBox
            :is_color="true"
            :content="content"
            :active_filters_ids="props.active_filters_ids"
            @send_active_filters_ids="send_active_filters_ids"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
//
.filter
  border: 1px solid $sub-90
  border-bottom: none
  &__grid
    display: grid
    grid-template-columns: 1fr 1fr 1fr 1fr

  &__expand-button-icon-wrapper
    border-radius: 100px
  &__expand-button
    &_hover
      &:hover
        color: $mark
  &:first-child
    border-top-left-radius: 5px
    border-top-right-radius: 5px
  &:last-child
    border-bottom: 1px solid $sub-90
    border-bottom-left-radius: 5px
    border-bottom-right-radius: 5px

.expand
    animation: expand .125s forwards ease-in

.expand_off
  animation: expand_off .125s forwards ease-in

@keyframes expand_off
  0%
    opacity: 100%
    transform: rotate(180deg);
  50%
    opacity: 0%
  100%
    transform: rotate(0deg);
    opacity: 100%

@keyframes expand
  0%
    transform: rotate(0deg);
  50%
    opacity: 0%
  100%
    opacity: 100%
    transform: rotate(-180deg);
</style>
