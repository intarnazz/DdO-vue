<script setup>
import { computed, ref } from 'vue'

const props = defineProps(['content', 'active_filters_ids'])
const emit = defineEmits(['send_active_filters_ids'])

const __is_active = ref(null)

const content = computed(() => props.content || {})
const active_filters_ids = computed(() => props.active_filters_ids || [])

const is_active = computed(() =>
  __is_active.value === null ? null : active_filters_ids.value.includes(content.value.id),
)
</script>

<template>
  <button
    @click="((__is_active = true), emit('send_active_filters_ids', content))"
    class="filter__button py-2 px-4 box-x gap-2"
    :class="{ active: is_active }"
  >
    <div
      :class="{
        active: is_active,
        active_off: is_active === false,
      }"
      class="filter__checkbox w-5.5 h-5.5"
    >
      <img
        :class="{
          hidden: !is_active,
        }"
        src="@/assets/icons/check_small.svg"
        alt=""
      />
    </div>
    <p>
      {{ content.name }}
    </p>
    <div class="flex"></div>
  </button>
</template>

<style lang="sass" scoped>
//
.filter
  &__checkbox
    border: 1px solid $sub
    border-radius: 5px
  &__button
    cursor: pointer
    &:hover
      background-color: $sub-95

.active
  &.filter
    &__checkbox
      animation: active .125s forwards linear

.active_off
  animation: active_off .125s forwards linear

@keyframes active
  0%
    border: 1px solid $sub
    border-radius: 5px
    box-shadow: 0 0 0px 0 $main
    margin-bottom: -1rem
  100%
    background-color: $main
    box-shadow: 0 0 10px 0 $main
    border: none
    margin-bottom: 0rem

@keyframes active_off
  0%
    background-color: $main
    box-shadow: 0 0 10px 0 $main
    border: none
    margin-bottom: -1rem
  100%
    border: 1px solid $sub
    border-radius: 5px
    box-shadow: 0 0 0px 0 $main
    margin-bottom: 0rem
</style>
