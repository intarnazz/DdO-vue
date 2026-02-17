import { reactive, computed, ComputedRef } from 'vue'
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
}

/**
 * Класс для управления фильтрами, сортировкой
 * и синхронизацией состояния с URL.
 */
class Filter extends Rest {
  /** Реактивное состояние фильтра */
  #data: FilterState

  /** Computed-обёртка над состоянием */
  #data_c: ComputedRef<FilterState>

  /**
   * Создаёт экземпляр фильтра,
   * инициализирует состояние и загружает данные из URL.
   */
  constructor() {
    super('filter')

    this.#data = reactive<FilterState>({
      filters: {},
      order: '',
      desc: '',
    })

    this.#data_c = computed(() => this.#data)

    this.#loadFromUrl()
  }

  /**
   * Полное состояние фильтра.
   */
  get value(): FilterState {
    return this.#data_c.value
  }

  /**
   * Текущие активные фильтры.
   */
  get filters(): Filters {
    return {
      ...this.#data_c.value.filters,
      length: String(Object.keys(this.#data_c.value.filters).length),
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

    console.log(value);
    console.log(!value);
    

    if (!value || this.#data.filters[key] === value) delete this.#data.filters[key]
    else Object.assign(this.#data.filters, obj)

    this.#saveToUrl()
  }

  /**
   * Поле сортировки.
   */
  get order(): string {
    return this.#data_c.value.order || ''
  }

  /**
   * Устанавливает поле сортировки.
   *
   * @param order Название поля
   */
  set order(order: string) {
    this.#data.order = String(order)
    this.#saveToUrl()
  }

  /**
   * Направление сортировки.
   */
  get desc(): string {
    return this.#data_c.value.desc || ''
  }

  /**
   * Устанавливает направление сортировки.
   *
   * @param desc Направление (`asc` / `desc`)
   */
  set desc(desc: string) {
    this.#data.desc = String(desc)
    this.#saveToUrl()
  }

  /**
   * Сохраняет текущее состояние фильтров и сортировки в URL.
   */
  #saveToUrl(): void {
    const filters = Object.fromEntries(
      Object.entries(this.#data_c.value.filters).filter(([, value]) => value),
    )

    router
      .replace({
        query: {
          ...filters,
          ...(this.#data_c.value.order ? { order: this.#data_c.value.order } : {}),
          ...(this.#data_c.value.desc ? { desc: this.#data_c.value.desc } : {}),
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

    this.#data.order = filters.order ?? ''
    this.#data.desc = filters.desc ?? ''

    delete filters.order
    delete filters.desc

    Object.assign(this.#data.filters, filters)
  }
}

/**
 * Синглтон фильтра.
 */
const filter = new Filter()
export default filter
