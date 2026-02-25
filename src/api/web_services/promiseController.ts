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
  response_id: number
}

/**
 * Класс для управления промисами с контролем состояния загрузки, идентификатора ответа и отменой.
 * Позволяет обрабатывать асинхронные операции, отменяя устаревшие промисы.
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
   * Текущий AbortController для активного промиса.
   * @private
   */
  private abort_controller: AbortController | null = null

  /**
   * Конструктор класса.
   * Инициализирует реактивные данные и вычисляемое значение.
   */
  constructor() {
    this.data = reactive({
      is_loading: false,
      response_id: 0,
    })
    this.data_c = computed(() => this.data)
  }

  /**
   * Асинхронный метод для ожидания выполнения функции с поддержкой отмены.
   * Устанавливает состояние загрузки, инкрементирует идентификатор, отменяет предыдущий промис (если есть)
   * и проверяет актуальность после выполнения.
   * @param foo - Функция, возвращающая промис. Принимает AbortSignal для поддержки отмены.
   * @returns Результат выполнения функции или false, если ответ устарел.
   */
  async await<T = Record<string, any>>(foo: (signal: AbortSignal) => Promise<T>): Promise<T | false> {
    // Отменяем предыдущий промис, если он существует
    if (this.abort_controller) {
      this.abort_controller.abort()
    }

    // Создаем новый AbortController
    this.abort_controller = new AbortController()
    const { signal } = this.abort_controller

    this.data.is_loading = true
    this.data.response_id++
    const current_response_id = this.data.response_id

    try {
      const res = await foo(signal)
      // Проверяем, не был ли промис отменен или устарел
      if (signal.aborted) {
        return false // Или throw new Error('Aborted') если нужно
      }
      if (current_response_id !== this.data.response_id) {
        return false
      }

      this.data.is_loading = false
      this.abort_controller = null // Очищаем после успеха
      return res
    } catch (error) {
      this.data.is_loading = false
      this.abort_controller = null
      if (error.name === 'AbortError') {
        return false // Игнорируем abort-ошибки
      }
      throw error // Перебрасываем другие ошибки
    }
  }

  /**
   * Геттер для состояния загрузки.
   * @returns Текущее состояние загрузки.
   */
  public get is_loading() {
    return this.data_c.value.is_loading
  }
}
