<script setup lang="ts">
import IconCheckSmall from '@/components/icons/IconCheckSmall.vue'

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
    class="filter__button gap-2 center"
    :class="{ active: props.is_active }"
  >
    <div
      :class="{
        active: props.is_active,
        active_off: props.is_active === false,
      }"
      :style="`background-color: #${content.name};`"
      class="filter__checkbox w-7.5 h-7.5 center"
    >
      <IconCheckSmall v-if="props.is_active" :fill="`#${content.name}`" />
    </div>
  </button>
</template>

<style lang="sass" scoped>
//
.filter
  &__checkbox
    position: relative
    border-radius: 5px
  &__button
    border-radius: 5px
    cursor: pointer
    // &:hover
    //   outline: 5px solid $sub-90

.active
  & .filter
    &__checkbox
      animation: active .125s forwards linear

.active_off
  animation: active_off .125s forwards linear

@keyframes active
  0%
    margin-bottom: -1rem
  100%
    margin-bottom: 0rem

@keyframes active_off
  0%
    margin-bottom: -1rem
  100%
    margin-bottom: 0rem
</style>
