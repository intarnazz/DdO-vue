<script setup lang="ts">
/**
 * Props interface for the filter button component.
 *
 * This interface defines the properties that can be passed to the component.
 */
interface Props {
  /**
   * Indicates whether the filter is currently active.
   */
  is_active: boolean

  /**
   * The content object containing the name of the filter.
   */
  content: {
    /**
     * The name of the filter to display.
     */
    name: string
    description: string
  }
}

const props = defineProps<Props>()
const emit = defineEmits<{ send_active_filters_ids: [] }>()

/**
 * Emits the 'send_active_filters_ids' event when the button is clicked.
 *
 * This function is triggered on button click to notify parent components
 * about the filter activation or deactivation.
 */
function send_active_filters_ids() {
  emit('send_active_filters_ids')
}
</script>

<template>
  <button
    :title="content.description"
    @click="send_active_filters_ids"
    class="filter__button py-2 px-4 box-x gap-2"
    :class="{ active: props.is_active }"
  >
    <div
      :class="{
        active: props.is_active,
        active_off: props.is_active === false,
      }"
      class="filter__checkbox w-5.5 h-5.5"
    >
      <img
        :class="{
          hidden: !props.is_active,
        }"
        src="@/assets/icons/check_small.svg"
        alt=""
      />
    </div>
    <p>
      {{ props.content.name }}
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
