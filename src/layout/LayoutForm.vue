<script setup lang="ts">
import { computed, ref, watch } from 'vue'

/**
 * Типизация props компонента FormMain
 */
interface Props {
  /** Сообщение об ошибке или статусе */
  message?: string
  /** Объект ошибок формы по ключам полей */
  errors?: Record<string, string>
  /** Флаг успешного завершения */
  success?: boolean
  /** Флаг загрузки */
  loding?: boolean
}

/**
 * Типизация событий компонента
 */
type Emits = {
  (e: 'submit'): void
}

// Получаем emit с типизацией
const emit = defineEmits<Emits>()

// Получаем props с типизацией
const props = defineProps<Props>()

/** Флаг подтверждения уведомления */
const isOk = ref(false)

/** Локальный флаг загрузки */
const isLoding = ref(false)

/** Вычисляемое свойство для состояния загрузки */
const loding = computed(() => props.loding ?? true)

/**
 * Обработчик отправки формы
 */
function submit(): void {
  isLoding.value = true
  emit('submit')
}

/**
 * Сброс флага isOk при изменении сообщения
 */
watch(
  () => props.message,
  () => {
    isOk.value = false
  },
)
</script>

<template>
  <div class="flex box-y gap2 form__wrapper w">
    <div class="box-y gap">
      <!-- Сообщение об ошибке или успехе -->
      <h2
        v-if="props.message && !isOk && !props.errors"
        class="form__error p"
        :class="{ success: props.success }"
      >
        {{ props.message }}
      </h2>

      <!-- Сообщение загрузки -->
      <h2 v-else-if="isLoding && !isOk && loding && !props.errors" class="form__error p isLoding">
        Загрузка...
      </h2>

      <!-- Ошибки по полям -->
      <template v-if="props.message && !isOk">
        <p class="form__error" v-for="(errorList, key) in props.errors" :key="key">
          {{ errorList[0] }}
        </p>
      </template>

      <!-- Кнопка подтверждения -->
      <div v-if="props.message && !isOk" class="box-x">
        <button @click="isOk = true" class="button__form">Ok</button>
      </div>
    </div>

    <!-- Основная форма -->
    <form @submit.prevent="submit" class="form w" :class="{ error: props.message && !isOk }">
      <slot></slot>
    </form>
  </div>
</template>

<style lang="sass">
.error
  .bg-error
    background-color: #ffdbdb
    color: #000

.form
  max-width: 450px
  width: 450px
  &__error
    color: #f00
  & input[type='radio']
    cursor: pointer
  &__wrapper
    display: flex
  &__box
    height: 3.25rem
    & > input
      border: 1px solid $th
      padding: 1rem .5rem
      border-bottom: none
      +wh
    & > select
      border: 1px solid $th
      padding: 1rem .5rem
      border-bottom: none
      +wh
    &:last-child
      border-bottom: 1px solid $th
    & > textarea
      border: 1px solid $th
      padding: 1rem .5rem
      border-bottom: none
      +wh
    &:last-child
      border-bottom: 1px solid $th
  & button
    height: 3.25rem
    border-radius: 0px
    border: none
    color: #fff
    font-weight: 400
    background: #02838D
    padding: 1rem
    box-shadow: 0 0 0 0 hsla(0,0%,0%,.6)
    &:hover
      margin: 0 0 0 0
      box-shadow: 0 0 0 0 #04838E
      background-color: #02838D

.success
  color: $successColor
  background-color: $successBg

.isLoding
  color: $isLodingColor
  background-color: $isLodingBg

@media screen and (max-width: 510px)
  .form
    max-width: none
    width: 100%
    margin: auto
</style>
