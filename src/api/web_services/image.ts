/**
 * Базовый URL API для получения изображений
 */
const API_URL: string = import.meta.env.VITE_API_URL
const URL: string = import.meta.env.VITE_URL

/**
 * Класс для работы с изображениями через API
 */
class Image {
  constructor() {}

  /**
   * Получение полного URL изображения по его идентификатору
   * @param id - Идентификатор изображения
   * @returns Строка с полным URL изображения
   *
   * @example
   * const url = new Image().get('123')
   */
  public get_by_id(id: string | number): string {
    return `${API_URL}image/${id}`
  }

  public get_by_storage(storage: string): string {
    return `${URL}storage/${storage}`
  }
}

const image = new Image()
export default image
