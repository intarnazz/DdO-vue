import { reactive, computed } from 'vue'
import type { ComputedRef } from 'vue'

/**
 * Интерфейс для внутренних данных контроллера.
 */
interface Data {
  /**
   * Флаг, указывающий на состояние загрузки.
   */
  is_loading: boolean
  /**
   * Идентификатор ответа (используется для отслеживания актуальности).
   */
  respons_id: number
}

/**
 * Класс для управления промисами с контролем состояния загрузки и идентификатора ответа.
 * Позволяет обрабатывать асинхронные операции, избегая обновлений от устаревших промисов.
 */
export default class PromiseController {
  /**
   * Реактивные внутренние данные.
   * @private
   */
  private data: Data
  /**
   * Вычисляемое значение для доступа к данным.
   * @private
   */
  private data_c: ComputedRef<Data>

  /**
   * Конструктор класса.
   * Инициализирует реактивные данные и вычисляемое значение.
   */
  constructor() {
    this.data = reactive({
      is_loading: false,
      respons_id: 0,
    })
    this.data_c = computed(() => this.data)
  }

  /**
   * Асинхронный метод для ожидания выполнения функции.
   * Устанавливает состояние загрузки, инкрементирует идентификатор ответа и проверяет актуальность после выполнения.
   * @param foo - Функция, возвращающая промис.
   * @returns Результат выполнения функции или false, если ответ устарел.
   */
  async await(foo: Function): Promise<Record<string, any> | false> {
    this.data.is_loading = true
    this.respons_id++
    const respons_id = this.respons_id

    const res = await foo()
    if (respons_id !== this.respons_id) return false

    this.data.is_loading = false
    return res
  }

  /**
   * Геттер для идентификатора ответа.
   * @private
   * @returns Текущий идентификатор ответа.
   */
  private get respons_id() {
    return this.data_c.value.respons_id
  }

  /**
   * Сеттер для идентификатора ответа.
   * @private
   * @param respons_id - Новое значение идентификатора.
   */
  private set respons_id(respons_id) {
    this.data.respons_id = respons_id
  }

  /**
   * Сеттер для состояния загрузки.
   * @private
   * @param is_loading - Новое значение флага загрузки.
   */
  private set is_loading(is_loading) {
    this.data.is_loading = is_loading
  }

  /**
   * Геттер для состояния загрузки.
   * @returns Текущее состояние загрузки.
   */
  public get is_loading() {
    return this.data_c.value.is_loading
  }
}
