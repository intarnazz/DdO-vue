<script setup lang="ts">
const { disabled = false } = defineProps<{
  disabled?: boolean
}>()
</script>

<template>
  <button :disabled="disabled" class="button">
    <div class="button__content">
      <slot />
    </div>
    <svg width="16" height="40" viewBox="0 0 16 40" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0 0C1.62204 0.0779781 3.11198 0.939424 3.98535 2.32031L14.2861 18.6094C15.3859 20.3486 15.3074 22.584 14.0889 24.2422L4.01172 37.9541C3.07295 39.2314 1.58449 39.9868 0 39.9922V0Z"
      />
    </svg>
  </button>
</template>
