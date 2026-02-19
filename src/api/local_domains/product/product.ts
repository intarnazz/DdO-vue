import { reactive, computed, watch } from 'vue'
import type { ComputedRef } from 'vue'
import type { PostBody, GetOptions } from '../../web_services/request/request'
import Rest from '../../web_services/rest'
import filter from '../filter/filter'

/**
 * Interface for the reactive data structure.
 */
interface Data {
  /** Object containing products data. */
  products: Record<string, any>
  /** Flag indicating if data is loading. */
  is_loading: boolean
}

/**
 * Class representing a Product handler extending Rest service.
 * Manages product data fetching and state.
 */
class Product extends Rest {
  private data: Data
  private data_c: ComputedRef<Data>

  private _page_count: ComputedRef<number>
  private _pages: ComputedRef<number[]>
  private _current_page: ComputedRef<number>
  private _is_pagination: ComputedRef<boolean>

  constructor() {
    super('product')

    this.data = reactive({
      products: {},
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

  get pages() {
    return this._pages.value
  }

  get page_count() {
    return this._page_count.value
  }

  get current_page() {
    return this._current_page.value
  }

  set current_page(current_page: number) {
    filter.offset = filter.limit * (current_page - 1)
  }

  get is_pagination() {
    return this._is_pagination.value
  }

  /**
   * Fetches all products asynchronously.
   * Sets loading state, fetches data, and updates products.
   * @param data Optional GET options.
   * @returns Promise resolving to the fetched data.
   */
  async all<T = Record<string, any>>(data?: GetOptions): Promise<T> {
    this.data.is_loading = true
    const res = await super.all<T>({
      limit: 48,
      ...data,
      ...filter.value,
    }) // Merge default limit with provided data if any
    Object.assign(this.data.products, res)
    this.data.is_loading = false
    return res
  }

  /**
   * Getter for products data.
   * @returns The products object or an empty object if undefined.
   */
  get products() {
    return this.data_c.value.products || {}
  }

  /**
   * Getter for loading state.
   * @returns The loading flag or false if undefined.
   */
  get is_loading() {
    return this.data_c.value.is_loading || false
  }
}

const product = new Product()
export default product
