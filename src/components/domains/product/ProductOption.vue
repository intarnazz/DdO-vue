<script setup lang="ts">
import { Option } from '@/api/local_domains/catalog/product/types'
import ComponentCount from '@/components/ComponentCount.vue'
import ComponentRecolorText from '@/components/ComponentRecolorText.vue'
import { price } from '@/utilte/utilte'

const { option } = defineProps<{
  option: Option
}>()

const emit = defineEmits<{
  set_option_count: [value: number]
}>()

const set_option_count = (number: number) => emit('set_option_count', option.count + number)
</script>

<template>
  <div class="br border option__item px-4 py-2 box-y gap-8">
    <div class="flex items-start max-sm:flex-col gap-8">
      <div class="box-y gap-4 flex">
        <strong> {{ option.name }}: </strong>
        <p class="c-sub">{{ option.description }}</p>
      </div>

      <div class="box-x">
        <div class="box-y w-25 gap-4 js">
          <strong> цена </strong>
          <p class="c-sub">
            <ComponentRecolorText :match="/[pPрР]/g" :text="price(option.price)" />
          </p>
        </div>

        <div class="box-y w-45 gap-4 js">
          <strong> количество </strong>
          <div class="box-x gap-2 js">
            <ComponentCount :count="option.count" @set_count="set_option_count" />

            <p v-if="option.is_set" class="c-sub">комплект</p>
            <p v-else class="c-sub">штук</p>
          </div>
        </div>

        <div class="box-y gap-4 w-25 items-end js">
          <strong> итого </strong>
          <p class="c-sub">
            <ComponentRecolorText :match="/[pPрР]/g" :text="price(option.price * option.count)" />
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped></style>
