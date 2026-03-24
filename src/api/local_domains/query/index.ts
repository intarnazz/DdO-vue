import { computed, ComputedRef, watch } from 'vue'
import BaseModel from '@/models/baseModel'
import UrlStorage from '@/storage/storage.url'

import { Pagin } from './pagin'
import { Order } from './order'
import { Search } from './search'
import { FilterStore } from './filters'

import { Filters, FiltersData, QueryData } from './types'

class Query extends BaseModel {
  private _urlStorage  : UrlStorage // prettier-ignore
  private _pagin       : Pagin // prettier-ignore
  private _order       : Order // prettier-ignore
  private _search      : Search // prettier-ignore
  private _filterStore : FilterStore // prettier-ignore
  private _query       : ComputedRef<Filters> // prettier-ignore

  constructor() {
    super()

    this._urlStorage = new UrlStorage()
    this._pagin = new Pagin()
    this._order = new Order()
    this._search = new Search()
    this._filterStore = new FilterStore()

    // Сводный computed только из непустых значений
    this._query = computed(() =>
      this.objectFilter<Filters>(
        computed(() => this.value),
        (_, value) => Boolean(value),
      ),
    )

    // Сброс offset при смене фильтров / сортировки / поиска
    watch(
      [() => this.filters, () => this.order, () => this.desc, () => this.search],
      () => (this.offset = 0),
    )

    // Сохраняем всё в URL при любом изменении
    watch(
      () => this.value,
      () => this._urlStorage.save(this.value),
      { deep: true },
    )
  }

  // ─── Общий вид ───────────────────────────────────────────────────────────

  get value(): QueryData {
    return {
      ...this._pagin.value,
      ...this._order.value,
      ...this._search.value,
      ...this._filterStore.value,
    }
  }

  // Не реактивен — использовать только для формирования запроса, не в шаблонах
  get query(): Filters {
    return this._query.value
  }

  // ─── Pagin ───────────────────────────────────────────────────────────────

  get limit(): number {
    return this._pagin.limit
  }

  set limit(limit: number) {
    this._pagin.limit = limit
  }

  get offset(): number {
    return this._pagin.offset
  }

  set offset(offset: number) {
    this._pagin.offset = offset
  }

  // ─── Order ───────────────────────────────────────────────────────────────

  get order(): string {
    return this._order.order
  }

  set order(order: string) {
    this._order.order = order
  }

  get desc(): string {
    return this._order.desc
  }

  set desc(desc: string) {
    this._order.desc = desc
  }

  // ─── Search ──────────────────────────────────────────────────────────────

  get search(): string {
    return this._search.search
  }

  set search(search: string) {
    this._search.search = search
  }

  // ─── Filters ─────────────────────────────────────────────────────────────

  get filters(): Filters & { length: number } {
    return this._filterStore.filters
  }

  set filters(obj: Filters) {
    this._filterStore.filters = obj
  }

  resetFilters() {
    this._filterStore.reset()
  }

  update(saved: Partial<QueryData>) {
    const { limit, offset, order, desc, search, ...rest } = saved

    this._pagin.load({ limit, offset })
    this._order.load({ order, desc })
    this._search.load({ search })
    this._filterStore.load(rest as FiltersData)
  }
}

const query = new Query()
export default query
