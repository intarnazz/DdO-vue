<script setup lang="ts">
import FormMain from '@/layout/LayoutForm.vue'
import { ref } from 'vue'
import { auth } from '@/api/api'
import { useRouter } from 'vue-router'

/**
 * Интерфейс описывает структуру ответа API при регистрации пользователя.
 */
interface RegisterResponse {
  /** Флаг успешности операции */
  success: boolean
  /** Сообщение от API, например, о статусе или ошибке */
  message?: string
  /** Объект ошибок по полям формы, ключи — имена полей */
  errors?: Record<string, string>
}

/**
 * Электронная почта пользователя
 */
const email = ref<string>('')

/**
 * Имя пользователя
 */
const name = ref<string>('')

/**
 * Номер телефона пользователя
 */
const phone = ref<string>('')

/**
 * Название компании пользователя
 */
const company = ref<string>('')

/**
 * Пароль пользователя
 */
const password = ref<string>('')

/**
 * Сообщение для отображения пользователю (например, ошибка или уведомление об успехе)
 */
const message = ref<string | null>(null)

/**
 * Объект ошибок формы. Ключи соответствуют полям формы (email, name, phone, company, password)
 */
const errors = ref<Record<string, string> | null>(null)

/**
 * Экземпляр роутера Vue Router для навигации между страницами
 */
const router = useRouter()

/**
 * Обработчик отправки формы регистрации
 *
 * Функция отправляет данные формы на сервер через API.
 * Если регистрация успешна — происходит переход на страницу профиля.
 * Если есть ошибки — они сохраняются в реактивные переменные для отображения в форме.
 */
async function submit(): Promise<void> {
  // Сбрасываем предыдущие сообщения и ошибки
  message.value = null
  errors.value = null

  try {
    // Отправка данных на API
    const res: RegisterResponse = await auth.reg({
      email: email.value,
      name: name.value,
      phone: phone.value,
      company: company.value,
      password: password.value,
    })

    if (res.success) {
      // Навигация на страницу профиля при успешной регистрации
      router.push({ name: 'profile' })
    } else {
      // Отображение сообщений об ошибках
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
            type="email"
            placeholder="Введите e-mail"
          />
        </div>

        <!-- Имя -->
        <div class="form__box">
          <input
            v-model="name"
            class="flex"
            :class="{ 'bg-error': errors?.name }"
            id="name"
            name="name"
            type="text"
            placeholder="Введите имя"
          />
        </div>

        <!-- Телефон -->
        <div class="form__box">
          <input
            v-model="phone"
            class="flex"
            :class="{ 'bg-error': errors?.phone }"
            id="phone"
            name="phone"
            type="tel"
            placeholder="Введите номер телефона"
          />
        </div>

        <!-- Компания -->
        <div class="form__box">
          <input
            v-model="company"
            class="flex"
            :class="{ 'bg-error': errors?.company }"
            id="company"
            name="company"
            type="text"
            placeholder="Название компании"
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
            placeholder="Придумайте пароль"
          />
        </div>
      </div>

      <div class="box-y h">
        <div class="flex"></div>
        <button type="submit" class="button">Зарегистрироваться</button>
      </div>
    </div>
  </FormMain>
</template>

<style lang="sass" scoped></style>
