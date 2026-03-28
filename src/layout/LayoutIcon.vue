<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const { active = false } = defineProps<{
  active: boolean
}>()

const _active = ref<boolean | number>(active ? 1 : 0)

const active_on = computed(() => _active.value === true)
const active_off = computed(() => _active.value === false)

watch(
  () => active,
  (n) => (_active.value = n),
)

// TODO: rename modul
</script>

<template>
  <slot :active="active" :active_on="active_on" :active_off="active_off" />
</template>
