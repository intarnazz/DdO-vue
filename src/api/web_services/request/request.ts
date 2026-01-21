import { user } from '../../api'
import { get, GetOptions } from './get/get'
import { post, PostBody } from './post/post'

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
class Request {
  #get: typeof get
  #post: typeof post

  constructor() {
    this.#get = get
    this.#post = post
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
  public async get<T = unknown>(url: string, obj: GetOptions = {}): Promise<T> {
    return this.__request<T>(await this.#get(url, obj))
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
  public async post<T = unknown>(url: string = '', body: PostBody = {}): Promise<T> {
    return this.__request<T>(await this.#post(url, body))
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
      user.auth.logout()
      throw new Error('Unauthorized: user logged out')
    }

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`)
    }

    return (await response.json()) as T
  }
}

const request = new Request()

export default request

export type { PostBody, GetOptions }
