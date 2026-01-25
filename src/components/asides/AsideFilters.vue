<script setup>
import { onMounted, ref } from 'vue'
import { tag as t, filter } from '@/api/api'

const isLoading = ref(true)
const tags = ref(null)

async function init() {
  isLoading.value = true
  const res = await t.all({
    limit: 7,
  })
  if (res.success) tags.value = res.data
  isLoading.value = false
}

onMounted(async () => {
  await init()
})
</script>

<template>
  <aside v-if="!isLoading" class="filters">
    <div class="box-y filters__tags w-80.25 max-w-80.25 py-2 bgc-sub br">
      <button
        @click="() => (filter.filters = { tag: tag.id })"
        class="flex py-2 px-4"
        :class="{
          filters__tags_active: tag.id == filter.filters['tag'],
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
    & button:hover
      +bgc-sub-90
    &_active
      color: $w
      font-weight: 700
      animation: active .225s forwards linear
      margin-left: -5px

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
