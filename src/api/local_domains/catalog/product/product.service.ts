import { reactive, computed, watch, markRaw, shallowRef } from 'vue'
import type { ComputedRef, ShallowRef } from 'vue'
import type { GetOptions } from '../../../web_services/request/request'
import Rest from '../../../web_services/rest'
import PromiseController from '../../../web_services/promiseController'
import { filter, type } from '@/api/api'
import Product from './product.model'
import type {
  ProductType,
  ProductServiceType,
  PagingInfo,
  ProductMeta,
  DefaultProductType,
} from './types'

const rest = new Rest('product')

/**
 * Сервис управления продуктами.
 *
 * Отвечает за загрузку списка продуктов с учётом фильтров, пагинацию,
 * хранение текущего продукта и продукта для сравнения.
 * Автоматически перезапрашивает данные при изменении фильтра.
 *
 * @example
 * ```ts
 * // Получить текущий список продуктов
 * product.products
 *
 * // Перейти на страницу 3
 * product.current_page = 3
 *
 * // Установить продукт для сравнения
 * product.comparison_product = someProduct
 * ```
 */
class ProductService {
  private data  : ProductServiceType // prettier-ignore
  private data_c: ComputedRef<ProductServiceType> // prettier-ignore

  /** Текущий выбранный продукт */
  private _product: ShallowRef<ProductType> // prettier-ignore

  /** Продукт, выбранный для сравнения. null означает "не выбран" */
  private _comparison_product: ShallowRef<ProductType | null> // prettier-ignore

  private rest              : Rest // prettier-ignore
  private promise_controller: PromiseController // prettier-ignore

  private _page_count   : ComputedRef<number> // prettier-ignore
  private _pages        : ComputedRef<number[]> // prettier-ignore
  private _current_page : ComputedRef<number> // prettier-ignore
  private _is_pagination: ComputedRef<boolean> // prettier-ignore

  /**
   * Создаёт экземпляр сервиса продуктов.
   *
   * Инициализирует реактивное состояние, вычисляемые свойства пагинации
   * и наблюдатель за изменениями фильтра, который автоматически
   * перезапрашивает список продуктов при любом изменении фильтра.
   */
  constructor() {
    this.promise_controller = new PromiseController()

    this.rest = rest

    this._product = shallowRef<ProductType>(new Product())
    this._comparison_product = shallowRef<ProductType | null>(null)

    this.data = reactive({
      products: [],
      pagingInfo: { limit: 0, offset: 0, totalCount: 0 } as PagingInfo,
      meta: { price: { min: 0, max: 0 } } as ProductMeta,
    })
    this.data_c = computed(() => this.data)

    this._page_count = computed(() => Math.ceil(this.pagingInfo.totalCount / filter.limit))
    this._pages = computed(() => Array.from({ length: this.page_count }, (_, i) => i + 1))
    this._current_page = computed(() => Math.ceil(filter.offset / filter.limit + 1))
    this._is_pagination = computed(() => filter.limit < this.pagingInfo.totalCount)

    watch(
      () => filter.value,
      () => {
        if (this.current_page > this.page_count) this.current_page = this.page_count
        this.all()
      },
      { deep: true },
    )
  }

  /**
   * Загружает список всех продуктов с учётом текущего фильтра и типа.
   *
   * Использует {@link PromiseController} для отмены предыдущего запроса
   * при повторном вызове. Обновляет `products`, `pagingInfo` и `meta`.
   *
   * @param data - Дополнительные опции для GET-запроса (переопределяют параметры фильтра)
   * @returns Промис, разрешающийся после обновления состояния
   */
  public async all(data: GetOptions = {}): Promise<unknown> {
    if (!type.type.id) return
    const res = await this.promise_controller.await((signal) =>
      this.rest.all({
        signal: signal,
        ...data,
        ...filter.query,
        type: type.type.id,
      }),
    )
    if (res === false) return
    if (!res.success) return

    this.products = res.data.map((product: Partial<DefaultProductType>) => new Product(product))
    this.pagingInfo = res.pagingInfo as PagingInfo
    this.meta = res.meta as ProductMeta
  }

  /**
   * Продукт, выбранный для сравнения. `null` если не выбран.
   */
  public get comparison_product() {
    return this._comparison_product.value
  }

  /**
   * Устанавливает продукт для сравнения.
   * Передай `null` чтобы сбросить.
   */
  public set comparison_product(comparison_product) {
    this._comparison_product.value =
      comparison_product === null ? null : new Product(comparison_product)
  }

  /**
   * Флаг активной загрузки данных.
   * `true` во время выполнения запроса.
   */
  public get is_loading() {
    return this.promise_controller.is_loading
  }

  /**
   * Мета-данные последней выборки (например, диапазон цен).
   */
  public get meta(): ProductMeta {
    return this.data_c.value.meta
  }

  /** @internal */
  private set meta(meta: ProductMeta) {
    Object.assign(this.data_c.value.meta, meta)
  }

  /**
   * Информация о пагинации последней выборки (totalCount, offset и т.д.).
   */
  public get pagingInfo(): PagingInfo {
    return this.data_c.value.pagingInfo
  }

  /** @internal */
  private set pagingInfo(pagingInfo: PagingInfo) {
    Object.assign(this.data_c.value.pagingInfo, pagingInfo)
  }

  /**
   * Текущий выбранный продукт.
   */
  public get product(): ProductType {
    return this._product.value
  }

  /**
   * Устанавливает текущий продукт, создавая новый экземпляр {@link Product}.
   * @param product - Данные нового продукта
   */
  public set product(product: DefaultProductType) {
    this._product.value = new Product(product)
  }

  /**
   * Массив номеров всех доступных страниц.
   * @example `[1, 2, 3, 4, 5]`
   */
  get pages() {
    return this._pages.value
  }

  /**
   * Общее количество страниц, вычисляемое на основе `totalCount` и лимита фильтра.
   */
  get page_count() {
    return this._page_count.value
  }

  /**
   * Номер текущей активной страницы (начиная с 1).
   */
  get current_page() {
    return this._current_page.value
  }

  /**
   * Устанавливает текущую страницу, пересчитывая `offset` в фильтре.
   * @param current_page - Номер страницы (начиная с 1)
   */
  set current_page(current_page: number) {
    filter.offset = filter.limit * (current_page - 1)
  }

  /**
   * `true`, если общее количество записей превышает лимит на страницу
   * и пагинация необходима.
   */
  get is_pagination() {
    return this._is_pagination.value
  }

  /**
   * Список продуктов текущей страницы.
   */
  public get products(): ProductType[] {
    return this.data_c.value.products
  }

  /** @internal */
  private set products(products: ProductType[]) {
    const raw = products.map((p) => markRaw(p))
    this.data_c.value.products.splice(0, this.data_c.value.products.length, ...raw)
  }
}

export default ProductService
