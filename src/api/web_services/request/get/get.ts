import { user, filter } from '../../../api'

/**
 * Базовый URL API.
 * Берётся из переменных окружения Vite.
 */
const API_URL = import.meta.env.VITE_API_URL

// ============================================================================
// Типы
// ============================================================================

/**
 * Опции для GET-запроса.
 *
 * Используются для передачи параметров пагинации и поиска
 * через HTTP-заголовки.
 */
export interface GetOptions {
  /**
   * Максимальное количество элементов в ответе.
   * @default 5
   */
  limit?: number

  /**
   * Смещение для пагинации.
   * @default 0
   */
  offset?: number

  /**
   * Массив имён для фильтрации.
   *
   * Используется для передачи списка имён (например, пользователей)
   * в GET-запросе. На стороне API может применяться как фильтр
   * (например, `WHERE name IN (...)`).
   *
   * При отправке преобразуется в строку и передаётся через HTTP-заголовок.
   *
   * @example
   * names: ['Alice', 'Bob', 'Charlie']
   */
  names?: string[]

  /**
   * Массив объектов фильтрации.
   *
   * Каждый фильтр представляет собой объект в формате
   * `{ [key: string]: string | number | boolean }`,
   * где `key` — имя поля, а `value` — значение для фильтрации.
   *
   * Используется для динамического построения условий на стороне API
   * (например, `WHERE status = 'active' AND isFeatured = true`).
   *
   * @example
   * filters: [
   *   { status: 'active' },
   *   { category: 'electronics' },
   *   { isFeatured: true }
   * ]
   */
  filters?: Record<string, string | number | boolean>[]

  /**
   * Строка поиска.
   *
   * Перед отправкой кодируется в base64 (UTF-8),
   * чтобы безопасно передаваться в заголовках.
   */
  search?: string
}

// ============================================================================
// GET
// ============================================================================

/**
 * Выполняет GET-запрос к API и возвращает необработанный `Response`.
 *
 * Функция отвечает **только за формирование запроса**:
 * - сбор заголовков
 * - кодирование параметров
 * - выполнение fetch
 *
 * Обработка ответа (проверка статуса, парсинг JSON,
 * обработка ошибок и авторизации) выполняется на более
 * высоком уровне (`__request` или аналог).
 *
 * @param url Путь запроса относительно `API_URL`
 * @param options Параметры запроса (limit, offset, search)
 * @returns Promise с объектом `Response`
 *
 * @example
 * const response = await get('/products', { limit: 10 })
 * const data = await response.json()
 */
export async function get(url: string, options: GetOptions = {}): Promise<Response> {
  let search = ''

  // Кодируем строку поиска в base64 (UTF-8 safe)
  if (options.search) {
    search = btoa(unescape(encodeURIComponent(options.search)))
  }

  const response = await fetch(`${API_URL}${url}`, {
    method: 'GET',
    headers: {
      limit: String(options.limit ?? 5),
      offset: String(options.offset ?? 0),
      names: String(options.names ?? ''),
      filters: JSON.stringify(filter.filters ?? {}),
      search,
      Authorization: `Bearer ${user.token ?? ''}`,
    },
  })

  return response
}
