/**
 * Базовый URL API для получения изображений
 */
const API_URL: string = import.meta.env.VITE_API_URL

/**
 * Класс для работы с изображениями через API
 */
export default class Image {
  constructor() {}

  /**
   * Получение полного URL изображения по его идентификатору
   * @param id - Идентификатор изображения
   * @returns Строка с полным URL изображения
   *
   * @example
   * const url = new Image().get('123')
   * console.log(url) // "http://localhost:8000/api/image/123"
   */
  get(id: string | number): string {
    return `${API_URL}image/${id}`
  }
}
