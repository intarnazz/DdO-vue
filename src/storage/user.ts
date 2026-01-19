// user.ts
import { ref, computed, watch, Ref, ComputedRef } from 'vue'
import { Storage } from './storage'

/**
 * Класс User
 *
 * Управляет токеном пользователя с реактивностью Vue
 * и хранением в localStorage через Storage.
 */
export class User {
  /** Экземпляр Storage для хранения токена */
  #tokenStorage: Storage<string>

  /** Реактивная переменная токена */
  #token: Ref<string | null>

  /**
   * Создает новый экземпляр User
   */
  constructor() {
    this.#tokenStorage = new Storage<string>('token')
    this.#token = ref<string | null>(this.#tokenStorage.get() || null)

    // Следим за изменением token и сохраняем/удаляем через Storage
    watch(this.#token, (newToken) => {
      // Если токен null — удаляем из хранилища, иначе сохраняем
      this.#tokenStorage.set(newToken || null)
    })
  }

  /**
   * Получить реактивный токен
   */
  get token(): ComputedRef<string | null> {
    return computed(() => this.#token.value)
  }

  /**
   * Установить новый токен
   * @param newToken - строка токена
   */
  setToken(newToken: string): void {
    this.#token.value = newToken
  }

  /**
   * Удалить токен
   */
  unsetToken(): void {
    this.#token.value = null
  }
}
