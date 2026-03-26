import { reactive, computed, ComputedRef } from 'vue'
import { OrderData } from './types'

export class Order {
  private data: OrderData = reactive({
    order: '',
    desc: '',
  })
  private data_c: ComputedRef<OrderData> = computed(() => this.data)

  public get order(): string {
    return this.data_c.value.order
  }

  public set order(order: string) {
    this.data.order = order
  }

  public get desc(): string {
    return this.data_c.value.desc
  }

  public set desc(desc: string) {
    this.data.desc = desc
  }
}
