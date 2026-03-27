import { reactive, computed, ComputedRef } from 'vue'
import { PaginData } from './types'

const LIMIT: number = Number(import.meta.env.VITE_LIMIT)

export class Pagin {
  private data: PaginData = reactive<PaginData>({
    limit: LIMIT,
    offset: 0,
  })
  private data_c: ComputedRef<PaginData> = computed(() => this.data)

  get limit(): number {
    return this.data_c.value.limit
  }

  set limit(limit: number) {
    this.data.limit = limit
  }

  get offset(): number {
    return this.data_c.value.offset
  }

  set offset(offset: number) {
    if (offset < 0 || !offset) offset = 0
    this.data.offset = offset
  }
}
