import { reactive, computed, ComputedRef } from 'vue'
import { Filters, FiltersData } from './types'

export class FilterStore {
  private data   : FiltersData              = reactive({}) // prettier-ignore
  private data_c : ComputedRef<FiltersData> = computed(() => this.data) // prettier-ignore

  private _length: ComputedRef<number> = computed(
    () =>
      Object.keys(
        Object.fromEntries(Object.entries(this.filters).filter(([, v]) => v != null && v !== '')),
      ).length,
  )

  reset() {
    Object.keys(this.data_c.value).forEach((key) => delete this.data_c.value[key])
  }

  public get length(): number {
    return this._length.value
  }

  public get filters(): Filters {
    return this.data_c.value
  }

  public set filters(obj: Filters) {
    Object.assign(this.data_c.value, obj)
  }
}
