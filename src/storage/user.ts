// user.ts
import { ref, computed, watch, Ref, ComputedRef } from 'vue'
import Storage from './storage'

/**
 * Класс User
 *
 * Управляет токеном пользователя с реактивностью Vue
 * и хранением в localStorage через Storage.
 */
class User {
  /** Экземпляр Storage для хранения токена */
  #tokenStorage: Storage<string>
  private favoriteStorage: Storage<number[]>
  private _favorite: Ref<number[]>

  /** Реактивная переменная токена */
  #token: Ref<string | null>
  /**
   * Создает новый экземпляр User
   */
  constructor() {
    this.#tokenStorage = new Storage<string>('token')
    this.#token = ref<string | null>(this.#tokenStorage.get() || null)

    this.favoriteStorage = new Storage('favorite')
    this._favorite = ref(this.favoriteStorage.get() || [])

    // Следим за изменением token и сохраняем/удаляем через Storage
    watch(this.#token, (newToken) => {
      if (newToken === null) this.#tokenStorage.remove()
      else this.#tokenStorage.set(newToken)
    })

    watch(this._favorite.value, () => {
      this.favoriteStorage.set(this._favorite.value)
    })
  }

  public get favorite(): number[] {
    return this._favorite.value
  }

  public set favorite(favorite_id: number) {
    const index = this.favorite.indexOf(favorite_id)
    if (index < 0) this._favorite.value.unshift(favorite_id)
    else this._favorite.value.splice(index, 1)
  }
  /**
   * Получить реактивный токен
   */
  public get token(): ComputedRef<string | null> {
    return computed(() => this.#token.value)
  }

  /**
   * Установить новый токен
   * @param newToken - строка токена
   */
  public setToken(newToken: string): void {
    this.#token.value = newToken
  }

  /**
   * Удалить токен
   */
  public unsetToken(): void {
    this.#token.value = null
  }
}

const user = new User()
export default user
