import { reactive, computed, watch } from 'vue'
import type { ComputedRef } from 'vue'
import type { PostBody, GetOptions } from '../../web_services/request/request'
import Rest from '../../web_services/rest'
import filter from '../filter/filter'
import PromiseController from '../../web_services/promiseController'
import user from '@/storage/user'

const rest = new Rest('product')
const promiseController = new PromiseController()

interface Image {
  id: number
  name: string
  path: string
  second_path: string
}

interface Variant {
  id: number
  type_id: number
  name: string
  description: string
}

interface ProductCategory {
  id: number
  self_id: number | null
  name: string
  visible_name: string
  description: string
}

interface Tag {
  id: number
  type_id: number
  name: string
  description: string
}

interface Brand {
  id: number
  image_id: number
  text_id: number
  name: string
  description: string
  type: string
  image: Image
}

interface Characteristic {
  id: number
  filter_id: number
  image_id: number
  name: string
  description: string
  is_visible: number
  image: Image
}

interface DefaultProductType {
  id: number
  type_id: number
  tag_id: number
  variant_id: number
  brand_id: number
  image_id: number
  name: string
  description: string
  video_url: string
  views: number
  price: number
  discount: number
  article: string
  is_stock: number
  is_in_store: number
  image: Image
  variant: Variant
  type: ProductCategory
  tag: Tag
  brand: Brand
  images: Image[]
  charactristics?: Characteristic[]
}

type Init = (id: number) => Promise<void>
type Reset = () => void

interface ProductType extends DefaultProductType {
  is_favorite: boolean
  init: Init
  reset: Reset
}

class Product {
  private data: Record<string, any>
  private data_c: ComputedRef<Record<string, any>>
  private rest: Rest
  private promise_controller: PromiseController

  constructor() {
    this.rest = rest

    this.promise_controller = promiseController

    this.data = reactive({})
    this.data_c = computed(() => this.data)
  }

  public reset: Reset = async () => {
    Object.keys(this.data_c.value).forEach((key) => delete this.data[key])
  }

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
interface ProductServiceType {
  /** Объект, содержащий данные о продуктах. */
  products: ProductType[]

  pagingInfo: Record<string, any>
  meta: Record<string, any>
}

/**
 * Класс, представляющий обработчик продуктов, расширяющий сервис Rest.
 * Управляет fetching'ом данных о продуктах и состоянием.
 */
class ProductService {
  private data: ProductServiceType
  private data_c: ComputedRef<ProductServiceType>

  private rest: Rest
  private _product: ProductType
  private promise_controller: PromiseController

  private _page_count: ComputedRef<number>
  private _pages: ComputedRef<number[]>
  private _current_page: ComputedRef<number>
  private _is_pagination: ComputedRef<boolean>

  /**
   * Конструктор класса Product.
   * Инициализирует реактивные данные, вычисляемые свойства и наблюдатель за изменениями фильтра.
   */
  constructor() {
    this.promise_controller = new PromiseController()

    this.rest = rest
    this._product = new Product()

    this.data = reactive({
      products: [],
      pagingInfo: {},
      meta: {},
    })
    this.data_c = computed(() => this.data)

    this._page_count = computed(() => Math.ceil(this.pagingInfo.totalCount / filter.limit))
    this._pages = computed(() => Array.from({ length: this.page_count }, (_, i) => i + 1))
    this._current_page = computed(() => Math.ceil(filter.offset / filter.limit + 1))
    this._is_pagination = computed(() => filter.limit < this.pagingInfo.totalCount)

    this.all()

    watch(
      () => (filter as any).value,
      () => {
        if (this.current_page > this.page_count) this.current_page = this.page_count
        this.all()
      },
      { deep: true },
    )
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

  public get product() {
    return this._product
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
   * Асинхронно fetches все продукты.
   * Устанавливает состояние загрузки, fetches данные и обновляет продукты.
   * @param data Опциональные опции для GET-запроса.
   * @returns Промис, разрешающийся в fetched данные.
   */
  async all(data?: GetOptions): Promise<any> {
    const res = await this.promise_controller.await((signal) =>
      this.rest.all({
        // limit: 48,
        signal: signal,
        ...data,
        ...filter.value,
      }),
    )
    if (res === false) return
    if (!res.success) return

    this.products = res.data
    this.pagingInfo = res.pagingInfo
    this.meta = res.meta
  }

  /**
   * Геттер для данных о продуктах.
   * @returns Объект продуктов или пустой объект, если не определено.
   */
  public get products() {
    return this.data_c.value.products
  }

  private set products(products) {
    this.data.products = products
  }
}

const product = new ProductService()

export default product
