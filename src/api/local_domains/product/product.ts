import { reactive, computed, watch } from 'vue'
import type { ComputedRef } from 'vue'
import type { PostBody, GetOptions } from '../../web_services/request/request'
import Rest from '../../web_services/rest'
import filter from '../filter/filter'
import PromiseController from '../../web_services/PromiseController'

/**
 * Интерфейс для структуры реактивных данных.
 */
interface Data {
  /** Объект, содержащий данные о продуктах. */
  products: Record<string, any>[]
  product: Record<string, any>

  pagingInfo: Record<string, any>
  meta: Record<string, any>
}

/**
 * Класс, представляющий обработчик продуктов, расширяющий сервис Rest.
 * Управляет fetching'ом данных о продуктах и состоянием.
 */
class Product {
  private data: Data
  private data_c: ComputedRef<Data>

  private rest: Rest
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
    this.rest = new Rest('product')
    this.promise_controller = new PromiseController()

    this.data = reactive({
      products: [],
      product: {},
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
    return this.data_c.value.product
  }

  private set product(product) {
    Object.assign(this.data.product, product)
  }

  async init_product(id: number) {
    const res = await this.promise_controller.await(() => this.rest.get(id))
    if (res === false) return
    if (!res.success) return

    this.product = res.data
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
    const res = await this.promise_controller.await(() =>
      this.rest.all({
        limit: 48,
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

  resetProduct() {
    Object.keys(product.product).forEach((key) => delete product.product[key])
  }
}

const product = new Product()
export default product
