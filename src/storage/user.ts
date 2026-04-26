// user.ts
import { computed } from 'vue'
import { useLocalStorage, useSessionStorage } from '@vueuse/core'
import type { RemovableRef } from '@vueuse/core'
import type { CartItem } from '@/api/local_domains/cart/cart'

/**
 * Класс User
 *
 * Управляет состоянием пользователя (токен, избранное, корзина).
 * Хранение и реактивность обеспечиваются через VueUse:
 *   - useLocalStorage  → token, favorite (persist между сессиями)
 *   - useSessionStorage → cart (только в рамках вкладки)
 *
 * watch и ручное сохранение больше не нужны —
 * VueUse синхронизирует значения автоматически.
 */
class User {
  private _token: RemovableRef<string | null>
  private _favorite: RemovableRef<number[]>
  private _cart: RemovableRef<CartItem[]>

  constructor() {
    this._token = useLocalStorage<string | null>('token', null)
    this._favorite = useLocalStorage<number[]>('favorite', [])
    this._cart = useSessionStorage<CartItem[]>('cart', [])
  }

  // ─── Cart ────────────────────────────────────────────────────────────────

  public get cart(): CartItem[] {
    return this._cart.value
  }

  public set cart(cart: CartItem[]) {
    this._cart.value = cart
  }

  // ─── Favorite ────────────────────────────────────────────────────────────

  public get favorite(): number[] {
    return this._favorite.value
  }

  /**
   * Переключает id в списке избранного (добавляет если нет, удаляет если есть).
   */
  public set favorite(favorite_id: number) {
    const index = this._favorite.value.indexOf(favorite_id)
    if (index < 0) this._favorite.value.unshift(favorite_id)
    else this._favorite.value.splice(index, 1)
  }

  // ─── Token ───────────────────────────────────────────────────────────────

  /**
   * Реактивный computed токен.
   * Можно использовать в watch, шаблоне или как зависимость.
   */
  public get token() {
    return computed(() => this._token.value)
  }

  public setToken(newToken: string): void {
    this._token.value = newToken
  }

  /**
   * Удаляет токен из памяти и localStorage.
   * useLocalStorage автоматически удаляет ключ при null.
   */
  public unsetToken(): void {
    this._token.value = null
  }
}

const user = new User()
export default user
