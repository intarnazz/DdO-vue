<script setup lang="ts">
import IconChevronLeft from '@/components/icons/IconChevronLeft.vue'
import IconChevronRight from '@/components/icons/IconChevronRight.vue'
import { computed } from 'vue'

const { count, min = 0 } = defineProps<{
  count: number
  min?: number
}>()

const emit = defineEmits<{
  set_count: [value: number]
}>()

const has_count = computed<boolean>(() => count > min)
const set_count = (number: number) => emit('set_count', number)
</script>

<template>
  <div class="box-x gap-2">
    <button :disabled="!has_count" @click="set_count(-1)">
      <IconChevronLeft />
    </button>
    <span class="c-main"> × </span>
    {{ count }}
    <button @click="set_count(1)">
      <IconChevronRight />
    </button>
  </div>
</template>

<style lang="sass" scoped></style>
