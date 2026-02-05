import { reactive, computed } from 'vue'
import Rest from '../../web_services/rest'

class Type extends Rest {
  #data
  #data_c

  constructor() {
    super('type')

    this.#data = reactive({
      type: {},
    })
    this.#data_c = computed(() => this.#data)
  }

  async init(type) {
    const res = await this.all({
      names: [type],
    })
    if (res.success) {
      this.value = res.data[0]
      await this.#__init_get__()
    }
  }

  async #__init_get__() {
    console.log(this.value)
    const res = await this.get(this.value.id)
    if (res.success) {
      this.value = res.data
    }
  }

  set value(value) {
    Object.assign(this.#data, value)
  }

  get value() {
    return this.#data_c.value || {}
  }
}

const type = new Type()
export default type
