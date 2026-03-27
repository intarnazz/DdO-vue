<script setup lang="ts">
/**
 * Компонент MainWrapper
 *
 * Обертка для основного контента страницы.
 * Проверяет наличие токена в sessionStorage и хранит его локально.
 * Содержимое компонента вставляется через слот.
 */
import IconUp from '@/components/icons/IconUp.vue'
import { onMounted, ref, watch } from 'vue'
import { RouteLocationNormalizedLoadedGeneric, useRoute } from 'vue-router'

const { foo } = defineProps<{
  foo?: (params: RouteLocationNormalizedLoadedGeneric) => Promise<unknown>
}>()

const route = useRoute()
const isLoading = ref(true)

async function init() {
  if (!foo) return
  isLoading.value = true
  await foo(route)
  isLoading.value = false
}

onMounted(async () => {
  await init()
})

watch(
  () => route.params.id,
  () => init(),
)
</script>

<template>
  <!-- Основной контейнер страницы -->
  <main class="main gap4 box-y flex">
    <IconUp />

    <!-- Слот для вставки дочернего контента -->
    <slot :isLoading="isLoading" />
  </main>
</template>

<style lang="sass" scoped>
/* Основной контейнер контента */
.main
  justify-content: flex-start
  align-items: center
  padding: 2rem 0
  min-height: 91vh
</style>
