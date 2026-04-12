<script setup lang="ts">
/**
 * Компонент MainWrapper
 *
 * Обертка для основного контента страницы.
 * Проверяет наличие токена в sessionStorage и хранит его локально.
 * Содержимое компонента вставляется через слот.
 */
import IconUp from '@/components/icons/IconUp.vue'
import { up_fast } from '@/utilte/utilte'
import { onMounted, ref, watch } from 'vue'
import { RouteLocationNormalizedLoadedGeneric, useRoute } from 'vue-router'

const { foo } = defineProps<{
  foo?: (params: RouteLocationNormalizedLoadedGeneric) => Promise<unknown>
}>()

const route = useRoute()
const isLoading = ref(true)
const promise = ref<unknown>(null)

async function init() {
  if (!foo) return
  isLoading.value = true
  promise.value = await foo(route)
  isLoading.value = false
}

onMounted(async () => {
  up_fast()
  await init()
})

watch(
  () => route.params.id,
  () => {
    up_fast()
    init()
  },
)
</script>

<template>
  <!-- Основной контейнер страницы -->
  <main class="main gap4 box-y flex">
    <IconUp />

    <!-- Слот для вставки дочернего контента -->
    <slot :isLoading="isLoading" :promise="promise" />
  </main>
</template>

<style lang="sass" scoped>
/* Основной контейнер контента */
.main
  justify-content: flex-start
  align-items: center
  padding: 2rem 0
  min-height: 93vh
</style>
