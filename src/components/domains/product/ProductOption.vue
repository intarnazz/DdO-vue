<script setup lang="ts">
import { Option } from '@/api/local_domains/catalog/product/types'
import ComponentRecolorText from '@/components/ComponentRecolorText.vue'
import IconChevronLeft from '@/components/icons/IconChevronLeft.vue'
import IconChevronRight from '@/components/icons/IconChevronRight.vue'
import { price } from '@/utilte/utilte'
import { computed } from 'vue'

const { option } = defineProps<{
  option: Option
}>()

const emit = defineEmits<{
  set_option_count: [value: number]
}>()

const option_count = computed<number>(() => option.count || 0)
const has_option_count = computed<boolean>(() => option_count.value > 0)

const set_option_count = (number: number) => emit('set_option_count', option_count.value + number)
</script>

<template>
  <div class="br border option__item px-4 py-2 box-x gap-8 as">
    <div class="box-y gap-4">
      <strong> {{ option.name }}: </strong>
      <p class="c-sub">{{ option.description }}</p>
    </div>
    <div class="box-y min-w-25 gap-4 js">
      <strong> цена </strong>
      <p class="c-sub">
        <ComponentRecolorText :match="/[pPрР]/g" :text="price(option.price)" />
      </p>
    </div>

    <div class="box-y min-w-35 gap-4 js">
      <strong> количество </strong>
      <div class="box-x">
        <button :disabled="!has_option_count" @click="set_option_count(-1)">
          <IconChevronLeft />
        </button>
        <span class="c-main"> × </span>
        {{ option_count }}
        <button @click="set_option_count(1)">
          <IconChevronRight />
        </button>
        <p class="c-sub">штук</p>
      </div>
    </div>

    <div class="box-y gap-4 min-w-25 items-end js">
      <strong> итого </strong>
      <p class="c-sub">
        <ComponentRecolorText :match="/[pPрР]/g" :text="price(option.price * option_count)" />
      </p>
    </div>
  </div>
</template>

<style lang="sass" scoped></style>
