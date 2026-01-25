<script setup>
import { onMounted, ref } from 'vue'
import { tag as t } from '@/api/api'

const isLoding = ref(true)
const tags = ref(null)

const tag_active = ref(null)

async function init() {
  isLoding.value = true
  const res = await t.all({
    limit: 7,
  })
  if (res.success) tags.value = res.data
  isLoding.value = false
}

onMounted(async () => {
  await init()
})
</script>

<template>
  <aside v-if="!isLoding" class="filters">
    <div class="box-y filters__tags w-80.25 max-w-80.25 py-2 bgc-sub br">
      <button
        @click="() => (tag_active = tag.id)"
        class="flex py-2 px-4"
        :class="{
          filters__tags_active: tag.id == tag_active,
        }"
        v-for="(tag, key) in tags"
        :key="key"
      >
        {{ tag.name }}
      </button>
    </div>
  </aside>
</template>

<style lang="sass" scoped>
//
.filters
  &__tags
    &_active
      // background-color: $main
      color: $w
      font-weight: 700
      animation: active .225s forwards linear

// .filters
//   &__tags
//     &_active
//       border-left: 5px solid $main

@keyframes active
  0%
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
    background: linear-gradient(to right, $main 0%, $mark 100%, #00000000 100%)
</style>
