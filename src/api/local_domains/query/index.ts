import { computed, ComputedRef, watch } from 'vue'
import UrlStorage from '@/storage/storage.url'

import { Pagin } from './query.pagin'
import { Order } from './query.order'
import { Search } from './query.search'
import { FilterStore } from './query.filters'

import { Filters, QueryData } from './types'
import { toNum, toStr } from '@/utilte/utilte'
import { LocationQuery } from 'vue-router'

export class Query {
  private _urlStorage : UrlStorage // prettier-ignore
  private _pagin      : Pagin // prettier-ignore
  private _order      : Order // prettier-ignore
  private _search     : Search // prettier-ignore
  private _filterStore: FilterStore // prettier-ignore
  private _query      : ComputedRef<Filters> // prettier-ignore
  private _value      : ComputedRef<QueryData> // prettier-ignore

  constructor() {
    this._urlStorage  = new UrlStorage() // prettier-ignore
    this._pagin       = new Pagin() // prettier-ignore
    this._order       = new Order() // prettier-ignore
    this._search      = new Search() // prettier-ignore
    this._filterStore = new FilterStore() // prettier-ignore

    // Сводный computed только из непустых значений
    this._query = computed(() =>
      Object.fromEntries(
        Object.entries(this.value)
          .filter(([, v]) => Boolean(v))
          .map(([k, v]) => [k, String(v)]),
      ),
    )
    // prettier-ignore
    this._value = computed(() => {
      return {
        limit : this.limit,
        offset: this.offset,
        order : this.order,
        desc  : this.desc,
        search: this.search,
        ...this._filterStore.filters,
      }
    })

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
    return this._value.value
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

  get length(): number {
    return this._filterStore.length
  }

  get filters(): Filters {
    return this._filterStore.filters
  }

  set filters(obj: Filters) {
    this._filterStore.filters = obj
  }

  resetFilters() {
    this._filterStore.reset()
  }

  update(saved: LocationQuery) {
    const query = Object.fromEntries(
      Object.entries(saved)
        .filter(([, v]) => v !== null)
        .map(([k, v]) => [k, Array.isArray(v) ? v[0] : v]),
    ) as Partial<QueryData>

    if (JSON.stringify(this.query) === JSON.stringify(query)) return

    const { limit, offset, order, desc, search, ...rest } = query

    this.limit  = toNum(limit, 48) // prettier-ignore
    this.offset = toNum(offset) // prettier-ignore
    this.order  = toStr(order) // prettier-ignore
    this.desc   = toStr(desc) // prettier-ignore
    this.search = toStr(search) // prettier-ignore

    this._filterStore.reset()
    this.filters = rest // prettier-ignore
  }
}

const query = new Query()
export default query
