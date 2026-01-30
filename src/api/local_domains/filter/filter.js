import { reactive, computed } from 'vue'
import { product } from '@/api/api'
import router from '@/router/router'
import Rest from '../../web_services/rest'

class Filter extends Rest {
  #filters
  #filters_c

  constructor() {
    super('filter')

    this.#filters = reactive({})
    this.#filters_c = computed(() => this.#filters)

    // Инициализация фильтров из URL при старте
    this.#loadFromUrl()
  }

  get filters() {
    return this.#filters_c.value
  }

  set filters(value) {
    const key = Object.keys(value)
    if (!value[key]) value[key] = null
    else if (this.#filters[key] == value[key]) ((value = {}), (value[key] = null))

    Object.assign(this.#filters, value)
    this.#saveToUrl(this.#filters)

    product.all()
  }

  // Сохраняем фильтры в URL
  #saveToUrl(filters) {
    filters = Object.fromEntries(Object.entries(filters).filter(([_, value]) => value))
    router
      .replace({
        query: {
          ...filters,
        },
      })
      .catch(() => {})
  }

  // Загружаем фильтры из URL при старте
  #loadFromUrl() {
    let filters = new URLSearchParams(window.location.search)
    filters = Object.fromEntries(filters.entries())

    filters = Object.fromEntries(Object.entries(filters).filter(([_, value]) => value))

    console.log(filters)
    if (filters) {
      try {
        Object.assign(this.#filters, filters)
      } catch (e) {
        console.warn('Не удалось распарсить фильтры из URL', e)
      }
    }
  }
}

const filter = new Filter()
export default filter
