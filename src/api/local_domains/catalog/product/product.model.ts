import { reactive, computed } from 'vue'
import type { ComputedRef } from 'vue'
import Rest from '../../../web_services/rest'
import PromiseController from '../../../web_services/promiseController'
import user from '@/storage/user'
import BaseModel from '@/models/baseModel'
import type {
  Image,
  Variant,
  ProductCategory,
  Tag,
  Brand,
  Characteristic,
  DefaultProductType,
  Init,
} from './types'

const rest = new Rest('product')
const promiseController = new PromiseController()

/**
 * Модель продукта.
 *
 * Инкапсулирует реактивные данные одного продукта, предоставляет геттеры
 * для всех полей, а также управляет состоянием «избранного» через хранилище пользователя.
 *
 * @example
 * ```ts
 * const p = new Product({ id: 1, name: 'Товар' })
 * await p.init(1) // загрузка свежих данных с сервера
 * console.log(p.name) // 'Товар'
 * ```
 */
class Product extends BaseModel {
  private data              : DefaultProductType // prettier-ignore
  private data_c            : ComputedRef<DefaultProductType> // prettier-ignore
  private rest              : Rest // prettier-ignore
  private promise_controller: PromiseController // prettier-ignore

  /**
   * Создаёт экземпляр модели продукта.
   * @param product - Исходный объект с данными продукта (может быть пустым)
   */
  constructor(product: Record<string, any> = {}) {
    super()

    this.rest = rest
    this.promise_controller = promiseController

    // prettier-ignore
    this.data = reactive({
      id             : this.toNum(product.id),
      type_id        : this.toNum(product.type_id),
      tag_id         : this.toNum(product.tag_id),
      variant_id     : this.toNum(product.variant_id),
      brand_id       : this.toNum(product.brand_id),
      image_id       : this.toNum(product.image_id),
      views          : this.toNum(product.views),
      price          : this.toNum(product.price),
      discount       : this.toNum(product.discount),
      is_stock       : Boolean(product.is_stock),
      is_in_store    : Boolean(product.is_in_store),
      name           : this.toStr(product.name),
      description    : this.toStr(product.description),
      video_url      : this.toStr(product.video_url),
      article        : this.toStr(product.article),
      image          : product.image ?? {},
      variant        : product.variant ?? {},
      type           : product.type ?? {},
      tag            : product.tag ?? {},
      brand          : product.brand ?? {},
      images         : product.images ?? [],
      characteristics: product.characteristics ?? [],
    })

    this.data_c = computed(() => this.data)
  }

  /**
   * Загружает данные продукта с сервера по идентификатору
   * и обновляет реактивное состояние.
   *
   * Если запрос был отменён или завершился неуспешно — обновление не происходит.
   *
   * @param id - Идентификатор продукта
   */
  public init: Init = async (id) => {
    const res = await this.promise_controller.await(() => this.rest.get(id))
    if (res === false) return
    if (!res.success) return

    Object.assign(this.data_c.value, res.data)
  }

  /**
   * Возвращает `true`, если продукт находится в избранном текущего пользователя.
   */
  public get is_favorite(): boolean {
    if (!this.id) return false
    return user.favorite.includes(this.id)
  }

  /**
   * Переключает статус избранного продукта.
   * Если текущий статус отличается от переданного — вызывает обновление в хранилище.
   * @param is_favorite - Новое значение флага избранного
   */
  public set is_favorite(is_favorite: boolean) {
    if (!this.id) return
    if (this.is_favorite !== is_favorite) user.favorite = this.id
  }

  /** Уникальный идентификатор продукта */
  public get id(): number {
    return this.data_c.value.id || 0
  }

  /** Идентификатор типа/категории продукта */
  public get type_id(): number {
    return this.data_c.value.type_id || 0
  }

  /** Идентификатор тега продукта */
  public get tag_id(): number {
    return this.data_c.value.tag_id || 0
  }

  /** Идентификатор варианта продукта */
  public get variant_id(): number {
    return this.data_c.value.variant_id || 0
  }

  /** Идентификатор бренда продукта */
  public get brand_id(): number {
    return this.data_c.value.brand_id || 0
  }

  /** Идентификатор основного изображения продукта */
  public get image_id(): number {
    return this.data_c.value.image_id || 0
  }

  /** Название продукта */
  public get name(): string {
    return this.data_c.value.name || ''
  }

  /** Описание продукта */
  public get description(): string {
    return this.data_c.value.description || ''
  }

  /** Ссылка на видео продукта */
  public get video_url(): string {
    return this.data_c.value.video_url || ''
  }

  /** Количество просмотров продукта */
  public get views(): number {
    return this.data_c.value.views || 0
  }

  /** Цена продукта */
  public get price(): number {
    return this.data_c.value.price || 0
  }

  /** Скидка на продукт */
  public get discount(): number {
    return this.data_c.value.discount || 0
  }

  /** Артикул продукта */
  public get article(): string {
    return this.data_c.value.article || ''
  }

  /** Наличие на складе */
  public get is_stock(): boolean {
    return this.data_c.value.is_stock
  }

  /** Наличие в физическом магазине */
  public get is_in_store(): boolean {
    return this.data_c.value.is_in_store
  }

  /** Основное изображение продукта */
  public get image(): Image {
    return this.data_c.value.image || null
  }

  /** Вариант продукта */
  public get variant(): Variant {
    return this.data_c.value.variant || null
  }

  /** Категория продукта */
  public get type(): ProductCategory {
    return this.data_c.value.type || null
  }

  /** Тег продукта */
  public get tag(): Tag {
    return this.data_c.value.tag || null
  }

  /** Бренд продукта */
  public get brand(): Brand {
    return this.data_c.value.brand || null
  }

  /** Список дополнительных изображений продукта */
  public get images(): Image[] {
    return this.data_c.value.images || []
  }

  /** Список характеристик продукта */
  public get characteristics(): Characteristic[] {
    return this.data_c.value.characteristics || []
  }
}

export default Product
