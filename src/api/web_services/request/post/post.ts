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
 * Тип тела POST-запроса.
 * Используется для передачи JSON-данных в теле запроса.
 */
export type PostBody = Record<string, unknown>

// ============================================================================
// POST
// ============================================================================

/**
 * Выполняет POST-запрос к API с JSON-телом.
 *
 * Функция отвечает **только за формирование и отправку запроса**:
 * - установка заголовков
 * - сериализация тела в JSON
 * - выполнение fetch
 *
 * Обработка ответа (проверка статуса, парсинг JSON,
 * обработка ошибок и авторизации) выполняется на более
 * высоком уровне (`__request` или аналог).
 *
 * @param url Путь запроса относительно `API_URL`
 * @param body Объект с данными для отправки в теле запроса
 * @returns Promise с объектом `Response`
 *
 * @example
 * const response = await post('/login', { username: 'admin', password: '1234' })
 * const data = await response.json()
 */
export default async function post(url: string = '', body: PostBody = {}): Promise<Response> {
  const response = await fetch(`${API_URL}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${user.token ?? ''}`,
    },
    body: JSON.stringify(body),
  })

  return response
}
