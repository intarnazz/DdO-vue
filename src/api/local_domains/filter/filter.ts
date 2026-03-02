import { reactive, computed, ComputedRef, watch } from 'vue'
import router from '@/router/router'
import Rest from '../../web_services/rest'

/**
 * Набор фильтров, где ключ — имя фильтра,
 * значение — строка или `null`, если фильтр сброшен.
 */
type Filters = Record<string, string | null>

/**
 * Состояние фильтрации и сортировки.
 */
interface FilterState {
  /** Активные фильтры */
  filters: Filters

  /** Поле сортировки */
  order: string

  /** Направление сортировки */
  desc: string

  /** limit запроса для пагинации */
  limit: number

  /** offset запроса для пагинации */
  offset: number

  search: string
}

/**
 * Класс для управления фильтрами, сортировкой
 * и синхронизацией состояния с URL.
 */
class Filter extends Rest {
  /** Реактивное состояние фильтра */
  data: FilterState

  /** Computed-обёртка над состоянием */
  data_c: ComputedRef<FilterState>

  /**
   * Создаёт экземпляр фильтра,
   * инициализирует состояние и загружает данные из URL.
   */
  constructor() {
    super('filter')

    this.data = reactive<FilterState>({
      filters: {},
      order: '',
      desc: '',

      limit: 48,
      offset: 0,

      search: '',
    })

    this.data_c = computed(() => this.data)

    this.#loadFromUrl()

    watch(
      [() => this.filters, () => this.order, () => this.desc, () => this.search],
      () => (this.offset = 0),
    )
  }

  get search() {
    return this.data_c.value.search
  }

  set search(search) {
    this.data.search = search
    this.saveToUrl()
  }

  /**
   * Полное состояние фильтра.
   */
  get value(): FilterState {
    return this.data_c.value
  }

  get limit(): number {
    return this.data_c.value.limit
  }

  set limit(limit: number) {
    this.data.limit = limit

    this.saveToUrl()
  }

  get offset(): number {
    return this.data_c.value.offset
  }

  set offset(offset: number) {
    if (offset < 0) offset = 0
    this.data.offset = offset

    this.saveToUrl()
  }

  /**
   * Текущие активные фильтры.
   */
  get filters(): Filters {
    return {
      ...this.data_c.value.filters,
      length: String(Object.keys(this.data_c.value.filters).length),
    }
  }

  /**
   * Устанавливает фильтр.
   * Если значение совпадает с текущим — фильтр сбрасывается.
   *
   * @param obj Объект с одним фильтром
   */
  set filters(obj: Filters) {
    const key = Object.keys(obj)[0]
    const value = Object.values(obj)[0]

    if (!value || this.data.filters[key] === value) delete this.data.filters[key]
    else Object.assign(this.data.filters, obj)

    this.saveToUrl()
  }

  resetFilters() {
    Object.keys(this.data.filters).forEach((key) => delete this.data.filters[key])

    this.saveToUrl()
  }

  /**
   * Поле сортировки.
   */
  get order(): string {
    return this.data_c.value.order || ''
  }

  /**
   * Устанавливает поле сортировки.
   *
   * @param order Название поля
   */
  set order(order: string) {
    this.data.order = String(order)
    this.saveToUrl()
  }

  /**
   * Направление сортировки.
   */
  get desc(): string {
    return this.data_c.value.desc || ''
  }

  /**
   * Устанавливает направление сортировки.
   *
   * @param desc Направление (`asc` / `desc`)
   */
  set desc(desc: string) {
    this.data.desc = String(desc)
    this.saveToUrl()
  }

  /**
   * Сохраняет текущее состояние фильтров и сортировки в URL.
   */
  public saveToUrl(): void {
    const filters = Object.fromEntries(
      Object.entries(this.data_c.value.filters).filter(([, value]) => value),
    )

    router
      .replace({
        query: {
          ...filters,
          ...(this.data_c.value.order ? { order: this.data_c.value.order } : {}),
          ...(this.data_c.value.desc ? { desc: this.data_c.value.desc } : {}),
          ...(this.data_c.value.limit ? { limit: this.data_c.value.limit } : {}),
          ...(this.data_c.value.offset ? { offset: this.data_c.value.offset } : {}),
          ...(this.data_c.value.search ? { search: this.data_c.value.search } : {}),
        },
      })
      .catch(() => {})
  }

  /**
   * Загружает состояние фильтров и сортировки из URL.
   */
  #loadFromUrl(): void {
    let filters: Record<string, string> = Object.fromEntries(
      new URLSearchParams(window.location.search).entries(),
    )

    filters = Object.fromEntries(Object.entries(filters).filter(([, value]) => value))

    this.data.order = filters.order ?? ''
    this.data.desc = filters.desc ?? ''
    this.data.limit = Number(filters.limit) || 48
    this.data.offset = Number(filters.offset) || 0
    this.data.search = filters.search || ''

    delete filters.order
    delete filters.desc
    delete filters.limit
    delete filters.offset
    delete filters.search

    Object.assign(this.data.filters, filters)
  }
}

/**
 * Синглтон фильтра.
 */
const filter = new Filter()
export default filter
