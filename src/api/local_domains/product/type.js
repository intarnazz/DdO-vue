import { reactive, computed } from 'vue'
import Rest from '../../web_services/rest'

class Type extends Rest {
  #data
  #data_c

  constructor() {
    super('type')

    this.#data = reactive({})
    this.#data_c = computed(() => this.#data)
  }

  async init(type) {
    console.log('__init__')
    const res = await this.all({
      names: [type],
    })
    if (res.success) {
      this.value = res.data[0]
      console.log('success')
      await this.#__init_get__()
    }
  }

  async #__init_get__() {
    console.log(this.value)
    const res = await this.get(this.value.id)
    if (res.success) {
      this.value = res.data
      console.log(this.value)
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
