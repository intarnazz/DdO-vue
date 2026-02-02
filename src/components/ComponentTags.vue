<script setup>
import { filter as f, type as t } from '@/api/api'
import { ref } from 'vue'
import IconKeyboardArrowDown from '@/components/icons/IconKeyboardArrowDown.vue'

const props = defineProps(['filter'])
const is_expand = ref(false)

function send_active_tag_id(id) {
  f.filters = { tag: String(id) }
}
</script>

<template>
  <div class="box-y filters__tags tags w-80.25 max-w-80.25 py-2 bgc-sub br">
    <template v-for="(tag, key) in t.value.tags" :key="key">
      <button
        @click="send_active_tag_id(tag.id)"
        class="flex py-2 px-4 filters__tag"
        :class="{
          filters__tags_active: f.filters['tag'] == tag.id,
        }"
        v-if="key < 7 || is_expand || tag.is_visible || f.filters['tag'] == tag.id"
      >
        {{ tag.name }}
      </button>
    </template>

    <button
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
      <p v-if="is_expand">свернуть</p>
      <p v-else>подробнее</p>
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

.filters
  &__tag
    &:hover
      +bgc-sub-90
  &__tags
    &_active
      color: $w
      font-weight: 700
      animation: active .225s forwards linear
      margin-left: -5px

// .expand
//     animation: expand .125s forwards ease-in

// .expand_off
//   animation: expand_off .125s forwards ease-in

// @keyframes expand_off
//   0%
//     opacity: 100%
//     transform: rotate(180deg);
//   50%
//     opacity: 0%
//   100%
//     transform: rotate(0deg);
//     opacity: 100%

// @keyframes expand
//   0%
//     transform: rotate(0deg);
//   50%
//     opacity: 0%
//   100%
//     opacity: 100%
//     transform: rotate(-180deg);



@keyframes active
  0%
    padding-left: 0rem
    background: linear-gradient(to right, $main 0%, #00000000 0%)
  7%
    background: linear-gradient(to right, $main 1%, #00000000 1%)
  14%
    background: linear-gradient(to right, $main 3%, #00000000 3%)
  21%
    background: linear-gradient(to right, $main 6%, #00000000 6%)
  28%
    background: linear-gradient(to right, $main 10%, #00000000 10%)
  35%
    background: linear-gradient(to right, $main 15%, #00000000 15%)
  42%
    background: linear-gradient(to right, $main 21%, #00000000 21%)
  49%
    background: linear-gradient(to right, $main 28%, #00000000 28%)
  56%
    background: linear-gradient(to right, $main 36%, #00000000 36%)
  63%
    background: linear-gradient(to right, $main 45%, #00000000 45%)
  70%
    background: linear-gradient(to right, $main 55%, #00000000 55%)
  77%
    background: linear-gradient(to right, $main 66%, #00000000 66%)
  84%
    background: linear-gradient(to right, $main 78%, #00000000 78%)
  91%
    background: linear-gradient(to right, $main 91%, #00000000 91%)
  100%
    padding-left: 1.2rem
    background: linear-gradient(to right, $main 0%, $mark 100%, #00000000 100%)
</style>
