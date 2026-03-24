import { reactive, computed, ComputedRef } from 'vue'
import BaseModel from '@/models/baseModel'
import { PaginData } from './types'

export class Pagin extends BaseModel {
  private data   : PaginData // prettier-ignore
  private data_c : ComputedRef<PaginData> // prettier-ignore

  constructor() {
    super()

    this.data = reactive<PaginData>({
      limit: 48,
      offset: 0,
    })

    this.data_c = computed(() => this.data)
  }

  load(partial: Partial<PaginData>) {
    if (partial.limit  !== undefined) this.data.limit  = partial.limit
    if (partial.offset !== undefined) this.data.offset = partial.offset
  }

  get value(): PaginData {
    return this.data_c.value
  }

  get limit(): number {
    return this.toNum(this.data_c.value.limit)
  }

  set limit(limit: number) {
    this.data.limit = this.toNum(limit, 48)
  }

  get offset(): number {
    return this.toNum(this.data_c.value.offset)
  }

  set offset(offset: number) {
    if (offset < 0 || !offset) offset = 0
    this.data.offset = offset
  }
}
