import { useLocalStorage } from '@vueuse/core'
import type { RemovableRef } from '@vueuse/core'

/**
 * Фабричная функция для работы с localStorage через VueUse.
 * Возвращает реактивный ref, синхронизированный с localStorage.
 *
 * @param key   - ключ в localStorage
 * @param defaultValue - значение по умолчанию (если ключа нет)
 * @returns RemovableRef<T> — реактивная ссылка с методом .value и поддержкой remove()
 *
 * @example
 * const token = createStorage<string>('token', null)
 * token.value = 'abc123'   // сохраняет в localStorage
 * token.value = null       // эквивалентно remove() — удаляет ключ
 */
export function createStorage<T>(key: string, defaultValue: T): RemovableRef<T> {
  return useLocalStorage<T>(key, defaultValue)
}
