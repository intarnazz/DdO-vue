import user from '@/storage/user'

/**
 * Экземпляр текущего пользователя
 * Используется для получения токена авторизации в заголовках запросов
 */
// const user = new User()

/**
 * Базовый URL API, берется из переменных окружения Vite
 * @type {string}
 */
const API_URL = import.meta.env.VITE_API_URL

// --------------------
// Типизация тела запроса
// --------------------

/**
 * Тип объекта для POST-запроса
 * Используется в теле запроса JSON
 */
export type PostBody = Record<string, unknown>

// --------------------
// POST запрос
// --------------------

/**
 * Выполняет POST-запрос к API с JSON-телом и возвращает данные заданного типа
 *
 * @template T - Тип данных, который ожидается в ответе
 * @param url - Путь запроса относительно базового URL API
 * @param body - Объект с данными для отправки в теле запроса
 * @returns Промис с данными типа T
 *
 * @throws {Error} Если ответ от сервера не OK или токен недействителен
 *
 * @example
 * interface LoginResponse { token: string }
 * const res = await Post<LoginResponse>('/login', { username: 'admin', password: '1234' })
 */
export async function Post<T = unknown>(url: string = '', body: PostBody = {}): Promise<T> {
  try {
    const response = await fetch(`${API_URL}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${user.token ?? ''}`,
      },
      body: JSON.stringify(body),
    })

    // Если токен недействителен — разлогиниваем пользователя
    if (response.status === 401) {
      user.auth.logout()
      throw new Error('Unauthorized: user logged out')
    }

    // Проверка успешности запроса
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`)
    }

    // Возвращаем JSON с ожидаемым типом
    return (await response.json()) as T
  } catch (e) {
    // Пробрасываем ошибку дальше
    throw e
  }
}
