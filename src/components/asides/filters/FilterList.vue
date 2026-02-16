<script setup>
import IconKeyboardArrowUp from '@/components/icons/IconKeyboardArrowUp.vue'
import ComponentFilter from '@/components/ComponentFilter.vue'
import RangePrice from '@/components/forms/inputs/randes/RangePrice.vue'
import { computed } from 'vue'

const props = defineProps([
  'is_expand_validation',
  'is_expand',
  'filter',
  'active_filters_ids',
  'MIN',
])
const emit = defineEmits(['expand_change', 'send_active_filters_ids'])

const MIN = props.MIN

console.log(props.filter)

const is_price = computed(() => props.filter.type === 'price' || false)

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
      <div class="box-x gap-4">
        <h3>{{ props.filter.name }}</h3>
        <p>подробнее</p>
      </div>
      <div class="flex"></div>
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
          <ComponentFilter
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
    & p
      color: $sub
      text-decoration: underline
      text-decoration-color: $main
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
