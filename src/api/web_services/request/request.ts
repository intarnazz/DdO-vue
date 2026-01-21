import { user } from '../../api'

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
 * Используются для передачи параметров пагинации и поиска.
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
   * Строка поиска.
   * Перед отправкой кодируется в base64.
   */
  search?: string
}

/**
 * Тип тела POST-запроса.
 * Используется для JSON-данных.
 */
export type PostBody = Record<string, unknown>

// ============================================================================
// Request
// ============================================================================

/**
 * Базовый HTTP-клиент для работы с REST API.
 *
 * Предназначен для наследования.
 * Содержит защищённые методы (`get`, `post`) для выполнения запросов
 * и приватный метод обработки ответа.
 *
 * @example
 * class ProductsRequest extends Request {
 *   list() {
 *     return this.get<Product[]>('/products')
 *   }
 * }
 */
export default class Request {
  #n: number

  constructor() {
    this.#n = 0
    console.log(this.#n++)
  }

  // --------------------------------------------------------------------------
  // GET
  // --------------------------------------------------------------------------

  /**
   * Выполняет GET-запрос к API.
   *
   * Метод является `protected` и предназначен для использования
   * только в классах-наследниках.
   *
   * @template T Тип данных, ожидаемых в ответе
   * @param url Путь запроса относительно `API_URL`
   * @param obj Параметры запроса (limit, offset, search)
   * @returns Promise с данными типа `T`
   *
   * @example
   * interface Product {
   *   id: number
   *   name: string
   * }
   *
   * const products = await this.get<Product[]>(
   *   '/products',
   *   { limit: 10, search: 'бетон' }
   * )
   */
  protected async get<T = unknown>(url: string, obj: GetOptions = {}): Promise<T> {
    let search = ''

    // Кодируем строку поиска в base64 (UTF-8 safe)
    if (obj.search) {
      search = btoa(unescape(encodeURIComponent(obj.search)))
    }

    const response = await fetch(`${API_URL}${url}`, {
      method: 'GET',
      headers: {
        limit: String(obj.limit ?? 5),
        offset: String(obj.offset ?? 0),
        search,
        Authorization: `Bearer ${user.token ?? ''}`,
      },
    })

    return this.__request<T>(response)
  }

  // --------------------------------------------------------------------------
  // POST
  // --------------------------------------------------------------------------

  /**
   * Выполняет POST-запрос к API с JSON-телом.
   *
   * Метод предназначен для использования в классах-наследниках.
   *
   * @template T Тип данных, ожидаемых в ответе
   * @param url Путь запроса относительно `API_URL`
   * @param body Объект, отправляемый в теле запроса
   * @returns Promise с данными типа `T`
   *
   * @throws Error Если запрос завершился с ошибкой
   *
   * @example
   * interface LoginResponse {
   *   token: string
   * }
   *
   * const res = await this.post<LoginResponse>(
   *   '/login',
   *   { username: 'admin', password: '1234' }
   * )
   */
  protected async post<T = unknown>(url: string = '', body: PostBody = {}): Promise<T> {
    const response = await fetch(`${API_URL}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${user.token ?? ''}`,
      },
      body: JSON.stringify(body),
    })

    return this.__request<T>(response)
  }

  // --------------------------------------------------------------------------
  // Internal
  // --------------------------------------------------------------------------

  /**
   * Унифицированная обработка HTTP-ответов.
   *
   * - Проверяет авторизацию
   * - Обрабатывает HTTP-ошибки
   * - Парсит JSON-ответ
   *
   * @template T Тип возвращаемых данных
   * @param response Объект `Response`, полученный от fetch
   * @returns Promise с распарсенным JSON
   *
   * @throws Error Если пользователь не авторизован или запрос завершился ошибкой
   */
  private async __request<T>(response: Response): Promise<T> {
    if (response.status === 401) {
      user.logout()
      throw new Error('Unauthorized: user logged out')
    }

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`)
    }

    return (await response.json()) as T
  }
}

class __Request extends Request {
  __post!: typeof this.post
  __get!: typeof this.post

  constructor() {
    super()
    this.__post = this.post
    this.__get = this.get
  }
}

export const request = new __Request()
