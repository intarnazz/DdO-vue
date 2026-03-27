import { reactive, computed, ComputedRef } from 'vue'
import { SearchData } from './types'

export class Search {
  private data   : SearchData              = reactive<SearchData>({search: ''}) // prettier-ignore
  private data_c : ComputedRef<SearchData> = computed(() => this.data) // prettier-ignore

  get search(): string {
    return this.data_c.value.search
  }

  set search(search: string) {
    this.data.search = search
  }
}
