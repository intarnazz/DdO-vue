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
  foo?: (params: RouteLocationNormalizedLoadedGeneric) => unknown
}>()

const route = useRoute()
const isLoading = ref(true)

function init() {
  if (!foo) return
  isLoading.value = true
  foo(route)
  isLoading.value = false
}

onMounted(() => {
  up_fast()
  init()
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
  <main class="main gap4 box-y flex-1">
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
  min-height: 94.2vh
</style>
