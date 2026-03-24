import { reactive, computed, ComputedRef } from 'vue'
import BaseModel from '@/models/baseModel'
import { SearchData } from './types'

export class Search extends BaseModel {
  private data   : SearchData // prettier-ignore
  private data_c : ComputedRef<SearchData> // prettier-ignore

  constructor() {
    super()

    this.data = reactive<SearchData>({
      search: '',
    })

    this.data_c = computed(() => this.data)
  }

  load(partial: Partial<SearchData>) {
    if (partial.search !== undefined) this.data.search = partial.search
  }

  get value(): SearchData {
    return this.data_c.value
  }

  get search(): string {
    return this.data_c.value.search
  }

  set search(search: string) {
    this.data.search = this.toStr(search)
  }
}
