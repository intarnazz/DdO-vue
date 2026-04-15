<script setup lang="ts">
import { computed } from 'vue'

const { text, match = /[^a-zA-Zа-яА-ЯёЁ0-9\p{Z}\p{C}]/gu } = defineProps<{
  text: string
  match?: RegExp
}>()

const mark_symbols = computed(() => text.match(match))

const parts = computed(() => {
  const res = <string[]>['']
  for (const s of text) {
    if (mark_symbols.value && !mark_symbols.value.includes(s)) res[res.length - 1] += s
    else {
      res.push(s)
      res.push('')
    }
  }
  return res
})
</script>

<template>
  <span>
    <template v-for="(part, key) in parts" :key="key">
      <span
        v-if="mark_symbols && mark_symbols.includes(part)"
        class="color-main font-normal font"
        >{{ part }}</span
      >
      <span v-else>{{ part }}</span>
    </template>
  </span>
</template>

<style lang="sass">
//
</style>
