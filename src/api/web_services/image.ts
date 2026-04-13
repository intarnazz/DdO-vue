import { Ref, ref } from 'vue'
import { Image as ImageType } from '@/api/local_domains/catalog/product/types'

interface Query {
  w?: number | undefined
  h?: number | undefined
}

/**
 * Базовый URL API для получения изображений
 */
const VITE_API_URL: string = import.meta.env.VITE_API_URL
const VITE_URL: string = import.meta.env.VITE_URL

/**
 * Класс для работы с изображениями через API
 */
class Image {
  current_image: Ref<ImageType | null> = ref(null)

  /**
   * Получение полного URL изображения по его идентификатору
   * @param id - Идентификатор изображения
   * @returns Строка с полным URL изображения
   *
   * @example
   * const url = new Image().get('123')
   */
  public get_by_id(id: string | number, query: Query = {}): string {
    const url = new URL(`${VITE_API_URL}image/${id}`)
    if (query.h) url.searchParams.append('h', String(query.h))
    if (query.w) url.searchParams.append('w', String(query.w))
    return url.toString()
  }

  public get_by_storage(storage: string): string {
    return `${VITE_URL}storage/${storage}`
  }
}

const image = new Image()
export default image
