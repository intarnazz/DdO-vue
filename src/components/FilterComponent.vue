<script setup>
import { filter as f } from '@/api/api'
import { computed, onMounted, ref } from 'vue'
import IconKeyboardArrowUp from '@/components/icons/IconKeyboardArrowUp.vue'

const props = defineProps(['filter'])
const active_filters_ids = ref([])
const is_expand = ref(false)

const filter = computed(() => props.filter || false)

onMounted(() => {
  if (f.filters[filter.value.type]) {
    active_filters_ids.value.push(...f.filters[filter.value.type].split(',').map(Number))
  }
})

function send_active_filters_ids(content) {
  const id = content.id

  if (!active_filters_ids.value.includes(id)) {
    active_filters_ids.value.push(id)
  } else {
    active_filters_ids.value = active_filters_ids.value.filter((i) => i !== id)
  }
  f.filters = { [filter.value.type]: String(active_filters_ids.value) }
}
</script>

<template>
  <div v-if="filter" class="filter pt-4 pb-2 box-y gap-2">
    <button @click="() => (is_expand = !is_expand)" class="box-x px-4 gap-2">
      <div
        :class="{
          expand: is_expand,
          expand_off: !is_expand,
        }"
        class="w-5.5 center"
      >
        <IconKeyboardArrowUp />
      </div>
      <h3>{{ filter.name }}</h3>
      <div class="flex"></div>
    </button>
    <div class="box-y">
      <template v-for="(content, key) in filter.content" :key="key">
        <botton
          v-if="
            key < 4 || is_expand || content.is_visible || active_filters_ids.includes(content.id)
          "
          @click="send_active_filters_ids(content)"
          class="filter__button py-2 px-4 box-x gap-2"
          :class="{ active: active_filters_ids.includes(content.id) }"
        >
          <div
            :class="{
              active: active_filters_ids.includes(content.id),
              off: !active_filters_ids.includes(content.id),
            }"
            class="filter__checkbox w-5.5 h-5.5"
          >
            <img
              :class="{
                hidden: !active_filters_ids.includes(content.id),
              }"
              src="@/assets/icons/check_small.svg"
              alt=""
            />
          </div>
          <p>
            {{ content.name }}
          </p>
          <div class="flex"></div>
        </botton>
      </template>
    </div>
  </div>
</template>

<style lang="sass" scoped>
//
.filter
  border: 1px solid $sub-90
  border-bottom: none
  &__checkbox
    border: 1px solid $sub
    border-radius: 5px
  &__button
    cursor: pointer
    &:hover
      background-color: $sub-95
  &:first-child
    border-top-left-radius: 5px
    border-top-right-radius: 5px
  &:last-child
    border-bottom: 1px solid $sub-90
    border-bottom-left-radius: 5px
    border-bottom-right-radius: 5px


.active
  &.filter
    &__checkbox
      animation: active .125s forwards linear

.off
  animation: off .125s forwards linear

.expand
    animation: expand .125s forwards ease-in

.expand_off
  animation: expand_off .125s forwards ease-in

@keyframes expand_off
  0%
    box-shadow: 0 0 0px 0 $mark
    transform: rotate(180deg);
  50%
    box-shadow: 0 0 10px 0 $mark
  100%
    transform: rotate(0deg);
    box-shadow: 0 0 0px 0 $mark

@keyframes expand
  0%
    transform: rotate(0deg);
    box-shadow: 0 0 0px 0 $mark
  50%
    box-shadow: 0 0 10px 0 $mark
  100%
    box-shadow: 0 0 0px 0 $mark
    transform: rotate(-180deg);



@keyframes active
  0%
    border: 1px solid $sub
    border-radius: 5px
    box-shadow: 0 0 0px 0 $main
    margin-bottom: -1rem
  100%
    background-color: $main
    box-shadow: 0 0 10px 0 $main
    border: none
    margin-bottom: 0rem

@keyframes off
  0%
    background-color: $main
    box-shadow: 0 0 10px 0 $main
    border: none
    margin-bottom: -1rem
  100%
    border: 1px solid $sub
    border-radius: 5px
    box-shadow: 0 0 0px 0 $main
    margin-bottom: 0rem
</style>
