import { reactive, computed, ComputedRef, watch } from 'vue'
import Rest from '../../web_services/rest'
import BaseModel from '@/models/baseModel'
import UrlStorage from '@/storage/storage.url'

type Filters = Record<string, string | null | number>

// prettier-ignore
interface FilterData {
  filters: Filters
  order  : string
  desc   : string
  limit  : number
  offset : number
  search : string
}

const URL_STORAGE_KEY = <string>'f'

class Filter extends BaseModel {
  private rest       : Rest // prettier-ignore
  private data       : FilterData // prettier-ignore
  private data_c     : ComputedRef<FilterData> // prettier-ignore
  private url_storage: UrlStorage // prettier-ignore

  constructor() {
    super()

    this.rest = new Rest('filter')
    this.url_storage = new UrlStorage(URL_STORAGE_KEY)

    this.data = reactive<FilterData>({
      filters: {},
      order: '',
      desc: '',
      limit: 48,
      offset: 0,
      search: '',
    })

    Object.assign(this.data, this.url_storage.load())

    this.data_c = computed(() => this.data)

    watch(
      [() => this.filters, () => this.order, () => this.desc, () => this.search],
      () => (this.offset = 0),
    )

    watch(
      () => this.data_c.value,
      () => this.url_storage.save(this.data_c.value),
      { deep: true },
    )
  }

  resetFilters() {
    Object.keys(this.data.filters).forEach((key) => delete this.data.filters[key])
  }

  get search() {
    return this.data_c.value.search
  }

  set search(search: string) {
    this.data.search = this.toStr(search)
  }

  get value(): FilterData {
    return this.data_c.value
  }

  get limit(): number {
    return this.data_c.value.limit
  }

  set limit(limit: number) {
    this.data.limit = this.toNum(limit, 48)
  }

  get offset(): number {
    return this.data_c.value.offset
  }

  set offset(offset: number) {
    if (offset < 0 || !offset) offset = 0
    this.data.offset = offset
  }

  get filters(): Filters & { length: number } {
    return {
      ...this.data_c.value.filters,
      length: Object.keys(this.data_c.value.filters).length,
    }
  }

  set filters(obj: Filters) {
    const key = Object.keys(obj)[0]
    const value = Object.values(obj)[0]
    if (key === undefined) return
    if (!value || this.data.filters[key] === value) delete this.data.filters[key]
    else Object.assign(this.data.filters, obj)
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

  get query(): Record<string, string> {
    if (this.url_storage.query === null) return {}
    return { [URL_STORAGE_KEY]: this.url_storage.query }
  }
}

const filter = new Filter()
export default filter
