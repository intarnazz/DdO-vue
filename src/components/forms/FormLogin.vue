<script setup lang="ts">
import FormMain from '@/layout/LayoutForm.vue'
import { ref } from 'vue'
import { auth } from '@/api/api'
import { useRouter } from 'vue-router'

/**
 * Интерфейс для описания ответа API при логине.
 */
interface LoginResponse {
  /** Успешен ли запрос */
  success: boolean
  /** Сообщение об ошибке или статусе */
  message?: string
  /** Объект ошибок по полям формы, где ключ — имя поля */
  errors?: Record<string, string>
}

/**
 * Email пользователя.
 */
const email = ref<string>('')

/**
 * Пароль пользователя.
 */
const password = ref<string>('')

/**
 * Сообщение для отображения пользователю (например, ошибка или уведомление об успехе).
 */
const message = ref<string | null>(null)

/**
 * Объект ошибок формы. Ключи соответствуют полям формы (например, email, password).
 */
const errors = ref<Record<string, string> | null>(null)

/**
 * Экземпляр роутера Vue Router для навигации между страницами.
 */
const router = useRouter()

/**
 * Обработчик отправки формы логина.
 *
 * Делает запрос к API для аутентификации пользователя.
 * Если логин успешен — перенаправляет на страницу профиля.
 * Если есть ошибки — сохраняет их в реактивные переменные для отображения.
 */
async function submit(): Promise<void> {
  // Сбрасываем старые сообщения и ошибки
  message.value = null
  errors.value = null

  try {
    // Отправка данных формы на API
    const res: LoginResponse = await auth.login({
      email: email.value,
      password: password.value,
    })

    if (res.success) {
      // Переход на страницу профиля при успешном входе
      router.push({ name: 'profile' })
    } else {
      // Отображение сообщений об ошибке
      message.value = res.message || 'Произошла ошибка'
      errors.value = res.errors || {}
    }
  } catch (err) {
    // Обработка ошибок сети или сервера
    message.value = 'Ошибка при запросе к серверу'
    console.error(err)
  }
}
</script>

<template>
  <FormMain @submit="submit" :message="message" :errors="errors">
    <div class="box-x media down flex wh">
      <div class="box-y wh flex">
        <!-- Email -->
        <div class="form__box">
          <input
            v-model="email"
            class="flex"
            :class="{ 'bg-error': errors?.email }"
            id="email"
            name="email"
            type="text"
            placeholder="Введите e-mail"
          />
        </div>

        <!-- Пароль -->
        <div class="form__box">
          <input
            v-model="password"
            class="flex"
            :class="{ 'bg-error': errors?.password }"
            id="password"
            name="password"
            type="password"
            placeholder="Введите пароль"
          />
        </div>
      </div>

      <div class="box-y h">
        <div class="flex"></div>
        <button type="submit" class="button">Войти</button>
      </div>
    </div>
  </FormMain>
</template>

<style lang="sass" scoped></style>
