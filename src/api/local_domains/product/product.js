import { reactive, computed } from 'vue'
import Rest from '../../web_services/rest'

class Product extends Rest {
  #products
  #products_c

  constructor() {
    super('product')

    this.#products = reactive({})
    this.#products_c = computed(() => this.#products)

    this.all()
  }

  async all() {
    // if (this.#products.data) this.#products.data.length = 0
    const res = await super.all({ limit: 48 })

    Object.assign(this.#products, res)
  }

  get products() {
    return this.#products_c.value || []
  }
}

const product = new Product()
export default product
