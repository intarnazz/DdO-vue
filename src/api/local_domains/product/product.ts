import { reactive, computed } from 'vue'
import type { ComputedRef } from 'vue'
import type { PostBody, GetOptions } from '../../web_services/request/request'
import Rest from '../../web_services/rest'

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

  constructor() {
    super('product')

    this.data = reactive({
      products: {},
      is_loading: false,
    })
    this.data_c = computed(() => this.data)

    this.all()
  }

  /**
   * Fetches all products asynchronously.
   * Sets loading state, fetches data, and updates products.
   * @param data Optional GET options.
   * @returns Promise resolving to the fetched data.
   */
  async all<T = Record<string, any>>(data?: GetOptions): Promise<T> {
    this.data.is_loading = false
    const res = await super.all<T>({ limit: 48, ...data }) // Merge default limit with provided data if any
    Object.assign(this.data.products, res)
    this.data.is_loading = true
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
