import { reactive, computed, ComputedRef } from 'vue'
import BaseModel from '@/models/baseModel'
import { Filters, FiltersData } from './types'

export class FilterStore extends BaseModel {
  private data   : FiltersData // prettier-ignore
  private data_c : ComputedRef<FiltersData> // prettier-ignore

  constructor() {
    super()

    this.data = reactive<FiltersData>({})

    this.data_c = computed(() => this.data)
  }

  load(partial: FiltersData) {
    Object.assign(this.data, partial)
  }

  reset() {
    Object.keys(this.data_c.value).forEach((key) => delete this.data_c.value[key])
  }

  get value(): FiltersData {
    return this.data_c.value
  }

  get filters(): Filters & { length: number } {
    return {
      ...this.data_c.value,
      length: Object.keys(this.data_c.value).length,
    }
  }

  set filters(obj: Filters) {
    const key   = Object.keys(obj)[0]
    const value = Object.values(obj)[0]
    if (key === undefined) return
    if (!value || this.data_c.value[key] === value) delete this.data_c.value[key]
    else Object.assign(this.data_c.value, obj)
  }
}
