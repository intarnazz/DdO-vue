import { user } from '../../../api'

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
   * Строка поиска.
   *
   * Перед отправкой кодируется в base64 (UTF-8),
   * чтобы безопасно передаваться в заголовках.
   */
  search?: string

  /**
   * Поле сортировки
   */
  order?: string

  desc?: boolean | number

  /**
   * Сигнал для отмены запроса.
   * Позволяет прервать запрос с помощью AbortController.
   *
   * @example
   * const controller = new AbortController();
   * get('/products', { signal: controller.signal });
   * // Позже: controller.abort();
   */
  signal?: AbortSignal
  [key: string]: string | string[] | number | number[] | undefined | AbortSignal | boolean
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
 * Поддерживает отмену запроса через `AbortSignal`.
 *
 * @param domen Путь запроса относительно `API_URL`
 * @param options Параметры запроса (limit, offset, search, signal и т.д.)
 * @returns Promise с объектом `Response`
 *
 * @example
 * const controller = new AbortController();
 * const responsePromise = get('/products', { limit: 10, signal: controller.signal });
 * // Для отмены: controller.abort();
 * try {
 *   const response = await responsePromise;
 *   const data = await response.json();
 * } catch (error) {
 *   if (error.name === 'AbortError') {
 *   }
 * }
 */
export async function get(domen: string, options: GetOptions = {}): Promise<Response> {
  const url = new URL(`${API_URL}${domen}`)

  Object.keys(options).forEach((key) => {
    if (key === 'signal') return
    if (key === 'desc') return
    const value = options[key]
    if (key === 'order' && Boolean(value))
      url.searchParams.append('desc', String(Number(Boolean(options.desc))))
    if (value) url.searchParams.append(key, String(value))
  })

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${user.token ?? ''}`,
    },
    signal: options.signal,
  })

  return response
}
