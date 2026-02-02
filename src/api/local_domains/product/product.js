import { reactive, computed } from 'vue'
import Rest from '../../web_services/rest'

class Product extends Rest {
  #data
  #data_c

  constructor() {
    super('product')

    this.#data = reactive({
      products: {},
      is_loading: false,
    })
    this.#data_c = computed(() => this.#data)

    this.all()
  }

  async all() {
    this.#data.is_loading = false
    const res = await super.all({ limit: 48 })
    Object.assign(this.#data.products, res)
    this.#data.is_loading = true
  }

  get products() {
    return this.#data_c.value.products || {}
  }

  get is_loading() {
    return this.#data_c.value.is_loading || false
  }
}

const product = new Product()
export default product
