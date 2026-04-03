import { reactive, computed } from 'vue'
import type { ComputedRef } from 'vue'
import Rest from '../../../web_services/rest'
import PromiseController from '../../../web_services/promiseController'
import user from '@/storage/user'
import type { DefaultProductType, Init } from './types'
import { toNum, toStr } from '@/utilte/utilte'
import {
  buildArray,
  ImageModel,
  ColorModel,
  VariantModel,
  ProductCategoryModel,
  TagModel,
  BrandModel,
  OptionModel,
  CharacteristicModel,
} from './models'

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
 * ```
 */
class Product {
  private data              : DefaultProductType // prettier-ignore
  private data_c            : ComputedRef<DefaultProductType> // prettier-ignore
  private rest              : Rest // prettier-ignore
  private promise_controller: PromiseController // prettier-ignore

  /**
   * Создаёт экземпляр модели продукта.
   * @param product - Исходный объект с данными продукта (может быть пустым)
   */
  constructor(product: Partial<DefaultProductType> = {}) {
    this.rest = new Rest('product')
    this.promise_controller = new PromiseController()

    // prettier-ignore
    this.data = reactive({
      id                 : toNum(product.id),
      type_id            : toNum(product.type_id),
      tag_id             : toNum(product.tag_id),
      variant_id         : toNum(product.variant_id),
      brand_id           : toNum(product.brand_id),
      image_primary_id   : toNum(product.image_primary_id),
      image_secondary_id : toNum(product.image_secondary_id),
      views              : toNum(product.views),
      price              : toNum(product.price),
      discount           : toNum(product.discount),
      is_stock           : Boolean(product.is_stock),
      is_in_store        : Boolean(product.is_in_store),
      name               : toStr(product.name),
      description        : toStr(product.description),
      video_url          : toStr(product.video_url),
      article            : toStr(product.article),
      image_primary      : new ImageModel(product.image_primary),
      image_secondary    : new ImageModel(product.image_secondary),
      variant            : new VariantModel(product.variant),
      type               : new ProductCategoryModel(product.type),
      tag                : new TagModel(product.tag),
      brand              : new BrandModel(product.brand),
      colors             : buildArray(ColorModel,          product.colors),
      images             : buildArray(ImageModel,          product.images),
      options            : buildArray(OptionModel,         product.options),
      characteristics    : buildArray(CharacteristicModel, product.characteristics),
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

  public get object() {
    return this.data_c.value
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
    return this.data_c.value.id
  }

  /** Идентификатор типа/категории продукта */
  public get type_id(): number {
    return this.data_c.value.type_id
  }

  /** Идентификатор тега продукта */
  public get tag_id(): number {
    return this.data_c.value.tag_id
  }

  /** Идентификатор варианта продукта */
  public get variant_id(): number {
    return this.data_c.value.variant_id
  }

  /** Идентификатор бренда продукта */
  public get brand_id(): number {
    return this.data_c.value.brand_id
  }

  /** Идентификатор основного изображения продукта */
  public get image_primary_id(): number {
    return this.data_c.value.image_primary_id
  }

  /** Идентификатор вторичного изображения продукта */
  public get image_secondary_id(): number {
    return this.data_c.value.image_secondary_id
  }

  /** Название продукта */
  public get name(): string {
    return this.data_c.value.name
  }

  /** Описание продукта */
  public get description(): string {
    return this.data_c.value.description
  }

  /** Ссылка на видео продукта */
  public get video_url(): string {
    return this.data_c.value.video_url
  }

  /** Количество просмотров продукта */
  public get views(): number {
    return this.data_c.value.views
  }

  /** Цена продукта */
  public get price(): number {
    return this.data_c.value.price
  }

  /** Скидка на продукт */
  public get discount(): number {
    return this.data_c.value.discount
  }

  /** Артикул продукта */
  public get article(): string {
    return this.data_c.value.article
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
  public get image_primary(): ImageModel {
    return this.data_c.value.image_primary
  }

  /** Вторичное изображение продукта */
  public get image_secondary(): ImageModel {
    return this.data_c.value.image_secondary
  }

  /** Вариант продукта */
  public get variant(): VariantModel {
    return this.data_c.value.variant
  }

  /** Категория продукта */
  public get type(): ProductCategoryModel {
    return this.data_c.value.type
  }

  /** Тег продукта */
  public get tag(): TagModel {
    return this.data_c.value.tag
  }

  /** Бренд продукта */
  public get brand(): BrandModel {
    return this.data_c.value.brand
  }

  /** Список цветов продукта */
  public get colors(): ColorModel[] {
    return this.data_c.value.colors
  }

  /** Список дополнительных изображений продукта */
  public get images(): ImageModel[] {
    return this.data_c.value.images
  }

  /** Список опций продукта */
  public get options(): OptionModel[] {
    return this.data_c.value.options
  }

  /** Список характеристик продукта */
  public get characteristics(): CharacteristicModel[] {
    return this.data_c.value.characteristics
  }
}

export default Product
