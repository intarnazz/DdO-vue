import { reactive, computed, ComputedRef } from 'vue'
import Rest from '../../web_services/rest'

interface Data {
  type: Record<string, any>
}

class Type extends Rest {
  private data: Data
  private data_c: ComputedRef<Data>

  constructor() {
    super('type')

    this.data = reactive({
      type: {},
    })
    this.data_c = computed(() => this.data)
  }

  async init(type: string) {
    const res = await this.all({
      names: [type],
    })
    if (res.success) {
      this.type = res.data[0]
      await this.#__init_get__()
    }
  }

  async #__init_get__() {
    const res = await this.get(this.type.id)
    if (res.success) {
      this.type = res.data
    }
  }

  set type(type) {
    Object.assign(this.data.type, type)
  }

  get type() {
    return this.data_c.value.type
  }
}

const type = new Type()
export default type
