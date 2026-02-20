import { reactive, computed, watch } from 'vue'
import type { ComputedRef } from 'vue'
import type { PostBody, GetOptions } from '../../web_services/request/request'
import Rest from '../../web_services/rest'
import filter from '../filter/filter'

/**
 * Интерфейс для структуры реактивных данных.
 */
interface Data {
  /** Объект, содержащий данные о продуктах. */
  products: Record<string, any>

  product: Record<string, any>
  /** Флаг, указывающий на загрузку данных. */
  is_loading: boolean
}

/**
 * Класс, представляющий обработчик продуктов, расширяющий сервис Rest.
 * Управляет fetching'ом данных о продуктах и состоянием.
 */
class Product {
  private data: Data
  private data_c: ComputedRef<Data>

  private rest: Rest

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

    this.data = reactive({
      products: {},
      product: {},
      is_loading: false,
    })
    this.data_c = computed(() => this.data)

    this._page_count = computed(() => Math.ceil(this.products.pagingInfo.totalCount / filter.limit))
    this._pages = computed(() => Array.from({ length: this.page_count }, (_, i) => i + 1))
    this._current_page = computed(() => Math.ceil(filter.offset / filter.limit + 1))
    this._is_pagination = computed(() => filter.limit < this.products.pagingInfo.totalCount)

    this.all()

    watch(
      () => (filter as any).value,
      () => {
        if (this.data.is_loading) return
        this.data.is_loading = true
        if (this.current_page > this.page_count) this.current_page = this.page_count
        this.all()
      },
      { deep: true },
    )
  }

  get product() {
    return this.data_c.value.product
  }

  async init_product(id: number) {
    this.data.is_loading = true
    const res = await this.rest.get(id)
    Object.assign(this.data.product, res.data)
    this.data.is_loading = false
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
  async all<T = Record<string, any>>(data?: GetOptions): Promise<any> {
    this.data.is_loading = true
    const res = await this.rest.all<T>({
      limit: 48,
      ...data,
      ...filter.value,
    })
    Object.assign(this.data.products, res)
    this.data.is_loading = false
  }

  /**
   * Геттер для данных о продуктах.
   * @returns Объект продуктов или пустой объект, если не определено.
   */
  get products() {
    return this.data_c.value.products
  }

  /**
   * Геттер для состояния загрузки.
   * @returns Флаг загрузки или false, если не определено.
   */
  get is_loading() {
    return this.data_c.value.is_loading || false
  }

  resetProduct() {
    Object.keys(product.product).forEach((key) => delete product.product[key])
  }
}

const product = new Product()
export default product
