import { reactive, computed, ComputedRef } from 'vue'
import BaseModel from '@/models/baseModel'
import { OrderData } from './types'

export class Order extends BaseModel {
  private data   : OrderData // prettier-ignore
  private data_c : ComputedRef<OrderData> // prettier-ignore

  constructor() {
    super()

    this.data = reactive<OrderData>({
      order: '',
      desc: '',
    })

    this.data_c = computed(() => this.data)
  }

  load(partial: Partial<OrderData>) {
    if (partial.order !== undefined) this.data.order = partial.order
    if (partial.desc  !== undefined) this.data.desc  = partial.desc
  }

  get value(): OrderData {
    return this.data_c.value
  }

  get order(): string {
    return this.data_c.value.order || ''
  }

  set order(order: string) {
    this.data.order = this.toStr(order)
  }

  get desc(): string {
    return this.data_c.value.desc || ''
  }

  set desc(desc: string) {
    this.data.desc = this.toStr(desc)
  }
}
