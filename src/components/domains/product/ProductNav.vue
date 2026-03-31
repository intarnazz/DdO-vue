<script setup lang="ts">
import { ref } from 'vue'
import LayoutResize from '@/layout/LayoutResize.vue'
import ComponentSwitch from '@/components/ComponentSwitch.vue'

interface ArgItem {
  value: string
  width: number
}

const { arguments: props_arguments } = defineProps<{
  arguments: string[]
}>()

const content = ref<ArgItem[]>(
  props_arguments.map((n) => ({
    value: n,
    width: 0,
  })),
)

const active = ref(0)

const set_active = (value: number) => (active.value = value)
</script>

<template>
  <div class="box-x gap-4 switch-nav c-sub">
    <div class="box-y">
      <div class="box-x switch-nav__button-wrapper">
        <LayoutResize
          v-for="(button, key) in content"
          :key="key"
          :button="button"
          :class="{ 'active-tab': active === key }"
          @click="set_active(key)"
        >
          <slot :active="active" :content="button" />
        </LayoutResize>
      </div>
      <ComponentSwitch :content="content" :active="active" />
    </div>
  </div>
</template>

<style lang="sass" scoped>
.switch-nav
  & button
    &:hover
      color: $mark

.active-tab
  color: $main
</style>
