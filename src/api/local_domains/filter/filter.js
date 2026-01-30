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
    if (this.#filters[key] == value[key]) ((value = {}), (value[key] = null))

    Object.assign(this.#filters, value)
    this.#saveToUrl(this.#filters)

    product.all()
  }

  // Сохраняем фильтры в URL
  #saveToUrl(filters) {
    const filtersParam = encodeURIComponent(JSON.stringify(filters))
    // сохраняем как query-параметр — Vue Router позаботится о history.state
    router
      .replace({
        query: {
          ...router.currentRoute.value.query,
          filters: filtersParam,
        },
      })
      .catch(() => {})
  }

  // Загружаем фильтры из URL при старте
  #loadFromUrl() {
    const urlParams = new URLSearchParams(window.location.search)
    const filtersParam = urlParams.get('filters')
    if (filtersParam) {
      try {
        const parsed = JSON.parse(decodeURIComponent(filtersParam))
        Object.assign(this.#filters, parsed)
      } catch (e) {
        console.warn('Не удалось распарсить фильтры из URL', e)
      }
    }
  }
}

const filter = new Filter()
export default filter
