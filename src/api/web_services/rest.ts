import Request from './request/request'
import { PostBody, GetOptions } from './request/request'

/**
 * Универсальный REST-клиент для работы с API.
 * Позволяет выполнять GET, POST, PATCH и DELETE запросы с базовым префиксом URL.
 */
export default class Rest extends Request {
  /** Префикс URL для этого ресурса (например, '/products') */
  #prefix: string

  /**
   * Конструктор REST-клиента
   * @param prefix - Префикс URL для ресурса
   */
  constructor(prefix: string) {
    super()
    this.#prefix = prefix
  }

  /**
   * Создает новый экземпляр Rest
   * @param prefix - Префикс URL для нового экземпляра
   * @returns Экземпляр класса Rest
   *
   * @example
   * const productsApi = Rest.create('/products')
   */
  static create(prefix: string): Rest {
    return new Rest(prefix)
  }

  /**
   * Получение одного элемента по ID
   * @param id - Идентификатор ресурса
   * @param header - Дополнительные параметры запроса (limit, offset, search)
   * @typeParam T - Тип объекта, ожидаемого в ответе
   * @returns Промис с объектом типа T
   *
   * @example
   * const product = await api.get<Product>(1)
   */
  public get<T = unknown>(id: string | number, header: GetOptions = {}): Promise<T> {
    return super.get<T>(`${this.#prefix}/${id}`, header)
  }

  /**
   * Получение всех элементов ресурса
   * @param data - Параметры запроса (limit, offset, search)
   * @typeParam T - Тип объекта или массива объектов, ожидаемого в ответе
   * @returns Промис с объектом типа T
   *
   * @example
   * const products = await api.all<Product[]>({ limit: 10 })
   */
  all<T = unknown>(data: GetOptions = {}): Promise<T> {
    return this.get<T>(this.#prefix, data)
  }

  /**
   * Создание нового ресурса
   * @param data - Объект с данными для создания ресурса
   * @typeParam T - Тип объекта, ожидаемого в ответе
   * @returns Промис с объектом типа T
   *
   * @example
   * const newProduct = await api.add<Product>({ name: 'New Product', price: 100 })
   */
  add<T = unknown>(data: PostBody): Promise<T> {
    return this.post<T>(this.#prefix, data)
  }

  /**
   * Внутренняя приватная функция для отправки PATCH/DELETE через POST с методом _method
   * @param url - URL запроса
   * @param method - Метод запроса ('PATCH' или 'DELETE')
   * @param data - Данные для отправки, обязательно поле id
   * @typeParam T - Тип объекта, ожидаемого в ответе
   * @returns Промис с объектом типа T
   */
  #Push<T = unknown>(url: string, method: 'PATCH' | 'DELETE', data: PostBody): Promise<T> {
    return this.post<T>(`${url}/${data.id}`, { _method: method, ...data })
  }

  /**
   * Обновление существующего ресурса
   * @param data - Данные для обновления, обязательное поле id
   * @typeParam T - Тип объекта, ожидаемого в ответе
   * @returns Промис с обновленным объектом типа T
   *
   * @example
   * await api.patch<Product>({ id: 1, price: 150 })
   */
  patch<T = unknown>(data: PostBody & { id: string | number }): Promise<T> {
    return this.#Push<T>(this.#prefix, 'PATCH', data)
  }

  /**
   * Удаление ресурса
   * @param data - Данные для удаления, обязательное поле id
   * @typeParam T - Тип объекта, ожидаемого в ответе (например, подтверждение удаления)
   * @returns Промис с объектом типа T
   *
   * @example
   * await api.delete<{ success: boolean }>({ id: 1 })
   */
  delete<T = unknown>(data: PostBody & { id: string | number }): Promise<T> {
    return this.#Push<T>(this.#prefix, 'DELETE', data)
  }
}
