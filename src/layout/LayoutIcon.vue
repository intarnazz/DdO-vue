<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const props = defineProps<{
  active: boolean
}>()

const active = computed(() => props.active || false)
const _active = ref<boolean | number>(active.value ? 1 : 0)
const active_on = computed(() => _active.value === true)
const active_off = computed(() => _active.value === false)

watch(
  () => active.value,
  (n) => (_active.value = n),
)
</script>

<template>
  <slot :active="active" :active_on="active_on" :active_off="active_off" />
</template>
