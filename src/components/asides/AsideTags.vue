<script setup lang="ts">
import { filter as f, type as t } from '@/api/api'
import { computed, ref } from 'vue'
import IconKeyboardArrowDown from '@/components/icons/IconKeyboardArrowDown.vue'

const is_expand = ref(false)

const MIN = 7

const is_expand_validation = computed(() => MIN < t.type.tags.length)

function send_active_tag_id(id: string) {
  if (f.filters['tag'] !== id) f.filters = { tag: id }
  else f.filters = { tag: undefined }
}
</script>

<template>
  <div
    class="box-y filters__tags select-menu select-menu__list tags w-80.25 max-w-80.25 py-2 bgc-sub br"
  >
    <template v-for="(tag, key) in t.type.tags" :key="key">
      <button
        @click="send_active_tag_id(String(tag.id))"
        class="flex py-2 px-4 filters__tag select-menu__item"
        :class="{
          'select-menu__item_active': f.filters['tag'] == tag.id,
        }"
        v-if="Number(key) < MIN || is_expand || f.filters['tag'] == tag.id"
      >
        <div>
          {{ tag.name }}
        </div>
      </button>
    </template>

    <button
      v-if="is_expand_validation"
      @click="() => (is_expand = !is_expand)"
      class="tags__button-expand box-x px-4 py-2 pt-4 gap-2"
    >
      <div
        :class="{
          expand: is_expand,
          expand_off: !is_expand,
        }"
      >
        <IconKeyboardArrowDown />
      </div>
      <span v-if="is_expand">свернуть</span>
      <span v-else>подробнее</span>
      <div class="flex"></div>
    </button>
  </div>
</template>

<style lang="sass" scoped>
//
.tags
  &__button-expand
    font-weight: 400
    color: $sub
    &:hover
      font-weight: 400
      color: $mark

.expand
  transform: rotate(-180deg);

.expand_off
  transform: rotate(0deg);
</style>
