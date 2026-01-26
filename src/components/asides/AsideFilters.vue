<script setup>
import { onMounted, ref } from 'vue'
import { tag as t, filter } from '@/api/api'
import IconKeyboardArrowDown from '@/components/icons/IconKeyboardArrowDown.vue'
import IconChevronLineUp from '@/components/icons/IconChevronLineUp.vue'

const isLoading = ref(true)
const tags = ref([])
const pagingInfo = ref(null)
const S_LIMIT = 7

async function findFilter() {
  const index = tags.value.findIndex((i) => i.id === filter.filters['tag'])
  console.log(index)
  if (index == -1) {
    const res = await t.get(filter.filters['tag'])
    if (res.success) tags.value.unshift(res.data)
  } else {
    tags.value.unshift(...tags.value.splice(index, 1))
  }
  isLoading.value = false
}

async function init(limit = S_LIMIT, offset = 0) {
  offset = pagingInfo.value?.offset || offset
  isLoading.value = true
  const res = await t.all({
    limit: limit,
    offset: offset,
  })
  if (res.success)
    (tags.value.push(...res.data.filter((i) => !tags.value.some((e) => e.id === i.id))),
      (pagingInfo.value = res.pagingInfo))

  if (offset === 0) {
    await findFilter()
  }

  const indexes = tags.value
    .map((item, index) => (item.id === filter.filters['tag'] ? index : -1))
    .filter((index) => index !== -1)

  if (indexes.length > 1) {
    console.log(indexes)
    tags.value.splice(indexes[1], 1)
  }
}

onMounted(async () => {
  await init()
})
</script>

<template>
  <aside class="filters">
    <div class="box-y filters__tags w-80.25 max-w-80.25 py-2 bgc-sub br">
      <button
        @click="() => (filter.filters = { tag: tag.id })"
        class="flex py-2 px-4 filters__tag"
        :class="{
          filters__tags_active: tag.id == filter.filters['tag'],
        }"
        v-for="(tag, key) in tags"
        :key="key"
      >
        {{ tag.name }}
      </button>
      <button
        v-if="pagingInfo?.totalCount > pagingInfo?.limit + pagingInfo?.offset"
        @click="init(100, pagingInfo.limit)"
        class="flex py-2 px-4 c-sub"
      >
        <IconKeyboardArrowDown />
        <p>подробнее</p>
      </button>

      <button
        v-else
        @click="
          (findFilter(),
          (tags.length = S_LIMIT),
          (pagingInfo.limit = S_LIMIT),
          (pagingInfo.offset = 0))
        "
        class="flex py-2 px-4 c-sub"
      >
        <IconChevronLineUp />
        <p>свернуть</p>
      </button>
    </div>
  </aside>
</template>

<style lang="sass" scoped>
//
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
