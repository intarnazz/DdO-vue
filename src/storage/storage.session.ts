import { useSessionStorage } from '@vueuse/core'
import type { RemovableRef } from '@vueuse/core'

/**
 * Фабричная функция для работы с sessionStorage через VueUse.
 * Возвращает реактивный ref, синхронизированный с sessionStorage.
 *
 * @param key   - ключ в sessionStorage
 * @param defaultValue - значение по умолчанию (если ключа нет)
 * @returns RemovableRef<T> — реактивная ссылка с методом .value и поддержкой remove()
 *
 * @example
 * const cart = createSessionStorage<CartType[]>('cart', [])
 * cart.value = [{ id: 1 }]  // сохраняет в sessionStorage
 * cart.value = null          // удаляет ключ
 */
export function createSessionStorage<T>(key: string, defaultValue: T): RemovableRef<T> {
  return useSessionStorage<T>(key, defaultValue)
}
