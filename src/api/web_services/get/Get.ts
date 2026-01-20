import { user } from '../../api'

/**
 * Базовый URL API, берется из переменных окружения Vite
 */
const API_URL = import.meta.env.VITE_API_URL

// --------------------
// Тип параметров запроса
// --------------------

/**
 * Опции для GET-запроса
 * @property limit - Максимальное количество элементов (по умолчанию 5)
 * @property offset - Смещение для пагинации (по умолчанию 0)
 * @property search - Строка поиска (будет закодирована в base64)
 */
export interface GetOptions {
  limit?: number
  offset?: number
  search?: string
}

// --------------------
// GET запрос
// --------------------

/**
 * Выполняет GET-запрос к API с указанным URL и параметрами
 * @template T - тип данных, который ожидается в ответе
 * @param url - Путь запроса относительно API_URL
 * @param obj - Параметры запроса (limit, offset, search)
 * @returns Промис с данными типа T
 *
 * @example
 * interface Product { id: number; name: string }
 * const products = await Get<Product[]>('/products', { limit: 10, search: 'бетон' })
 */
export async function Get<T = unknown>(url: string, obj: GetOptions = {}): Promise<T> {
  let search = ''

  // Кодируем строку поиска в base64, если указана
  if (obj.search) {
    search = btoa(unescape(encodeURIComponent(obj.search)))
  }

  // Выполняем запрос
  const response = await fetch(`${API_URL}${url}`, {
    method: 'GET',
    headers: {
      limit: String(obj.limit ?? 5),
      offset: String(obj.offset ?? 0),
      search,
      Authorization: `Bearer ${user.auth.token ?? ''}`,
    },
  })

  // Если статус ответа не OK — выбрасываем ошибку
  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}`)
  }

  // Возвращаем JSON как тип T
  return response.json() as Promise<T>
}
