<script setup lang="ts">
import IconKeyboardArrowUp from '@/components/icons/IconKeyboardArrowUp.vue'
import RangePrice from '@/components/forms/inputs/randes/RangePrice.vue'
import { computed } from 'vue'
import ButtonCheckBox from '@/components/buttons/ButtonCheckBox.vue'
import { Characteristic } from '@/api/local_domains/catalog/product/types'
import { product } from '@/api/api'

const props = defineProps([
  'is_expand_validation',
  'is_expand',
  'filter',
  'active_filters_ids',
  'MIN',
])
const emit = defineEmits(['expand_change', 'send_active_filters_ids'])

const MIN = props.MIN

const is_price = computed(() => props.filter.type === 'price' || false)

function expand_change() {
  emit('expand_change')
}

function send_active_filters_ids(content: Characteristic) {
  emit('send_active_filters_ids', content)
}
</script>

<template>
  <div
    v-if="(product.meta.price.max && product.meta.price.min) || !is_price"
    class="filter pt-4 pb-2 box-y gap-2"
  >
    <button
      @click="expand_change"
      class="filter__title box-x px-4 gap-2 filter__expand-button"
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
      <div class="box-x gap-4 text-start">
        <strong>{{ props.filter.name }}</strong>
        <span v-if="props.is_expand_validation">подробнее</span>
      </div>
      <div class="flex-1"></div>
    </button>
    <div class="box-y">
      <RangePrice
        v-if="is_price"
        @expand_change="expand_change"
        @send_active_filters_ids="send_active_filters_ids"
        :MIN="MIN"
        :is_expand_validation="is_expand_validation"
        :is_expand="is_expand"
        :filter="filter"
        :active_filters_ids="active_filters_ids"
      />

      <template v-else>
        <template v-for="(content, key) in props.filter.content" :key="key">
          <ButtonCheckBox
            v-if="
              key < MIN ||
              props.is_expand ||
              content.is_visible ||
              props.active_filters_ids.includes(content.id)
            "
            :content="content"
            :active_filters_ids="props.active_filters_ids"
            @send_active_filters_ids="send_active_filters_ids"
          />
        </template>
      </template>
    </div>
  </div>
</template>

<style lang="sass" scoped>
//
.filter
  border: 1px solid $sub-90
  border-bottom: none
  &__title
    & span
      color: $sub
      text-decoration: underline
      text-decoration-color: $main
  &__expand-button-icon-wrapper
    border-radius: 100px
  &__expand-button
    &_hover
      &:hover
        color: $mark
        & span
          text-decoration-color: $mark
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
