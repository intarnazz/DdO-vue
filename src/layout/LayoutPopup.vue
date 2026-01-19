<script setup>
// dev
import SvgClose from '@/components/svg/SvgClose.vue'
const props = defineProps(['popupIsOpen'])
const emit = defineEmits(['popupIsClose'])

function close() {
  emit('popupIsClose')
}
</script>

<template>
  <div v-if="props.popupIsOpen" class="popup center">
    <SvgClose @click="close()" class="popup__close" />
    <div class="popup__content center">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.popup
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  background-color: hsla(0, 0%, 0%, .8)
  z-index: 3
  &__close
    position: absolute
    top: 1rem
    left: 1rem
</style>
