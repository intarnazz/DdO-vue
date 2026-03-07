import { reactive, computed, watch, markRaw, toRaw } from 'vue'
import type { ComputedRef } from 'vue'
import type { PostBody, GetOptions } from '../../web_services/request/request'
import Rest from '../../web_services/rest'
import filter from '../filter/filter'
import PromiseController from '../../web_services/promiseController'
import user from '@/storage/user'
import BaseModel from '@/models/baseModel'
import { type } from '@/api/api'

const rest = new Rest('product')
const promiseController = new PromiseController()

// prettier-ignore
interface Image {
  id         : number
  name       : string
  path       : string
  second_path: string
}

// prettier-ignore
interface Variant {
  id         : number
  type_id    : number
  name       : string
  description: string
}

// prettier-ignore
interface ProductCategory {
  id          : number
  self_id     : number | null
  name        : string
  visible_name: string
  description : string
}

// prettier-ignore
interface Tag {
  id         : number
  type_id    : number
  name       : string
  description: string
}

// prettier-ignore
interface Brand {
  id         : number
  image_id   : number
  text_id    : number
  name       : string
  description: string
  type       : string
  image      : Image
}

// prettier-ignore
interface Characteristic {
  id         : number
  filter_id  : number
  image_id   : number
  name       : string
  description: string
  is_visible : number
  image      : Image
}

// prettier-ignore
interface DefaultProductType {
  id             : number
  type_id        : number
  tag_id         : number
  variant_id     : number
  brand_id       : number
  image_id       : number
  name           : string
  description    : string
  video_url      : string
  views          : number
  price          : number
  discount       : number
  article        : string
  is_stock       : number
  is_in_store    : number
  image          : Image
  variant        : Variant
  type           : ProductCategory
  tag            : Tag
  brand          : Brand
  images         : Image[]
  characteristics: Characteristic[]
}

type Init = (id: number) => Promise<void>
// type Reset = () => void

// prettier-ignore
export interface ProductType extends DefaultProductType {
  is_favorite: boolean
  init       : Init
    // reset: Reset
}

class Product extends BaseModel {
  private data              : DefaultProductType // prettier-ignore
  private data_c            : ComputedRef<DefaultProductType> // prettier-ignore
  private rest              : Rest // prettier-ignore
  private promise_controller: PromiseController // prettier-ignore

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
      is_stock       : this.toNum(product.is_stock),
      is_in_store    : this.toNum(product.is_in_store),
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

  // public reset: Reset = async () => {
  //   Object.keys(this.data_c.value).forEach((key) => delete this.data[key])
  // }

  public init: Init = async (id) => {
    const res = await this.promise_controller.await(() => this.rest.get(id))
    if (res === false) return
    if (!res.success) return

    Object.assign(this.data_c.value, res.data)
  }

  public get is_favorite(): boolean {
    if (!this.id) return false
    return user.favorite.includes(this.id)
  }

  public set is_favorite(is_favorite: boolean) {
    if (!this.id) return
    if (this.is_favorite !== is_favorite) user.favorite = this.id
  }

  public get id(): number {
    return this.data_c.value.id || 0
  }

  public get type_id(): number {
    return this.data_c.value.type_id || 0
  }

  public get tag_id(): number {
    return this.data_c.value.tag_id || 0
  }

  public get variant_id(): number {
    return this.data_c.value.variant_id || 0
  }

  public get brand_id(): number {
    return this.data_c.value.brand_id || 0
  }

  public get image_id(): number {
    return this.data_c.value.image_id || 0
  }

  public get name(): string {
    return this.data_c.value.name || ''
  }

  public get description(): string {
    return this.data_c.value.description || ''
  }

  public get video_url(): string {
    return this.data_c.value.video_url || ''
  }

  public get views(): number {
    return this.data_c.value.views || 0
  }

  public get price(): number {
    return this.data_c.value.price || 0
  }

  public get discount(): number {
    return this.data_c.value.discount || 0
  }

  public get article(): string {
    return this.data_c.value.article || ''
  }

  public get is_stock(): number {
    return this.data_c.value.is_stock || 0
  }

  public get is_in_store(): number {
    return this.data_c.value.is_in_store || 0
  }

  public get image(): Image {
    return this.data_c.value.image || null
  }

  public get variant(): Variant {
    return this.data_c.value.variant || null
  }

  public get type(): ProductCategory {
    return this.data_c.value.type || null
  }

  public get tag(): Tag {
    return this.data_c.value.tag || null
  }

  public get brand(): Brand {
    return this.data_c.value.brand || null
  }

  public get images(): Image[] {
    return this.data_c.value.images || []
  }

  public get characteristics(): Characteristic[] {
    return this.data_c.value.characteristics || []
  }
}
/**
 * Интерфейс для структуры реактивных данных.
 */
// prettier-ignore
interface ProductServiceType {
  products  : ProductType[]
  pagingInfo: Record<string, any>
  meta      : Record<string, any>
}

/**
 * Класс, представляющий обработчик продуктов, расширяющий сервис Rest.
 * Управляет fetching'ом данных о продуктах и состоянием.
 */
class ProductService {
  private data  : ProductServiceType // prettier-ignore
  private data_c: ComputedRef<ProductServiceType> // prettier-ignore

  private _product: {
    value: ProductType | null
  }

  private _comparison_product: {
    value: ProductType | null
  }

  private rest              : Rest // prettier-ignore
  private promise_controller: PromiseController // prettier-ignore

  private _page_count   : ComputedRef<number> // prettier-ignore
  private _pages        : ComputedRef<number[]> // prettier-ignore
  private _current_page : ComputedRef<number> // prettier-ignore
  private _is_pagination: ComputedRef<boolean> // prettier-ignore

  /**
   * Конструктор класса Product.
   * Инициализирует реактивные данные, вычисляемые свойства и наблюдатель за изменениями фильтра.
   */
  constructor() {
    this.promise_controller = new PromiseController()

    this.rest = rest
    this._product = { value: new Product() }
    this._comparison_product = { value: new Product() }

    this.data = reactive({
      products: [],
      pagingInfo: {},
      meta: {
        price: {},
      },
    })
    this.data_c = computed(() => this.data)

    this._page_count = computed(() => Math.ceil(this.pagingInfo.totalCount / filter.limit))
    this._pages = computed(() => Array.from({ length: this.page_count }, (_, i) => i + 1))
    this._current_page = computed(() => Math.ceil(filter.offset / filter.limit + 1))
    this._is_pagination = computed(() => filter.limit < this.pagingInfo.totalCount)

    // this.all()

    watch(
      () => (filter as any).value,
      () => {
        if (this.current_page > this.page_count) this.current_page = this.page_count
        this.all()
      },
      { deep: true },
    )
  }

  /**
   * Асинхронно fetches все продукты.
   * Устанавливает состояние загрузки, fetches данные и обновляет продукты.
   * @param data Опциональные опции для GET-запроса.
   * @returns Промис, разрешающийся в fetched данные.
   */
  public async all(data: GetOptions = {}): Promise<any> {
    const filter_local = structuredClone(toRaw(filter.value))
    filter_local.filters['type'] = String(type.type.id)

    const res = await this.promise_controller.await((signal) =>
      this.rest.all({
        // limit: 48,
        signal: signal,
        ...data,
        ...filter_local,
      }),
    )
    if (res === false) return
    if (!res.success) return

    this.products = res.data.map((product: any) => {
      return new Product(product)
    })

    this.pagingInfo = res.pagingInfo
    this.meta = res.meta
  }

  public get comparison_product(): ProductType | null {
    return this._comparison_product.value
  }

  private set comparison_product(comparison_product: ProductType) {
    this._comparison_product.value = new Product(comparison_product)
  }

  public get is_loading() {
    return this.promise_controller.is_loading
  }

  public get meta() {
    return this.data_c.value.meta
  }

  private set meta(meta) {
    Object.assign(this.data_c.value.meta, meta)
  }

  public get pagingInfo() {
    return this.data_c.value.pagingInfo
  }

  private set pagingInfo(pagingInfo) {
    Object.assign(this.data_c.value.pagingInfo, pagingInfo)
  }

  public get product(): ProductType | null {
    return this._product.value
  }

  public set product(product: ProductType) {
    this._product.value = new Product(product)
  }

  /**
   * Геттер для списка страниц.
   * @returns Массив номеров страниц.
   */
  get pages() {
    return this._pages.value
  }

  /**
   * Геттер для общего количества страниц.
   * @returns Количество страниц.
   */
  get page_count() {
    return this._page_count.value
  }

  /**
   * Геттер для текущей страницы.
   * @returns Номер текущей страницы.
   */
  get current_page() {
    return this._current_page.value
  }

  /**
   * Сеттер для текущей страницы.
   * Обновляет offset в фильтре на основе новой страницы.
   * @param current_page Номер новой текущей страницы.
   */
  set current_page(current_page: number) {
    filter.offset = filter.limit * (current_page - 1)
  }

  /**
   * Геттер для флага наличия пагинации.
   * @returns True, если пагинация активна.
   */
  get is_pagination() {
    return this._is_pagination.value
  }

  /**
   * Геттер для данных о продуктах.
   * @returns Объект продуктов или пустой объект, если не определено.
   */
  public get products(): ProductType[] {
    return this.data_c.value.products
  }

  private set products(products: ProductType[]) {
    const raw = products.map((p) => markRaw(p))
    this.data_c.value.products.splice(0, this.data_c.value.products.length, ...raw)
  }
}

const product = new ProductService()

export default product
