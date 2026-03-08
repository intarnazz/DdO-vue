import { computed, ComputedRef, reactive } from 'vue'

/**
 * Интерфейс внутреннего реактивного состояния хранилища.
 */
interface Data {
  /** Закодированная строка текущего состояния из URL или sessionStorage. */
  query: string | null
}

/**
 * Класс для сохранения и загрузки произвольного состояния через URL-параметры
 * с резервным хранением в `sessionStorage`.
 *
 * Данные сериализуются в JSON, кодируются в Base64 и помещаются
 * в параметр строки запроса URL. Это позволяет делиться состоянием
 * приложения через ссылку.
 *
 * @example
 * const storage = new UrlStorage('appState')
 *
 * // Сохранить состояние
 * storage.save({ page: 1, filters: { active: true } })
 *
 * // Загрузить состояние
 * const state = storage.load()
 *
 * // Проверить наличие сохранённого состояния
 * if (storage.has()) { ... }
 *
 * // Очистить состояние
 * storage.clear()
 */
export default class UrlStorage {
  /** Ключ URL-параметра и ключ записи в `sessionStorage`. */
  private key   : string // prettier-ignore
  /** Реактивное состояние с закодированной строкой запроса. */
  private data  : Data // prettier-ignore
  /** Вычисляемая ссылка на реактивное состояние для использования в Vue. */
  private data_c: ComputedRef<Data> // prettier-ignore

  /**
   * Создаёт экземпляр `UrlStorage`.
   *
   * @param key - Ключ для URL-параметра и `sessionStorage`. По умолчанию `'state'`.
   */
  constructor(key: string = 'state') {
    this.key = key

    this.data = reactive<Data>({
      query: null,
    })

    this.data_c = computed(() => this.data)
  }

  /**
   * Сохраняет произвольный объект в URL и `sessionStorage`.
   *
   * Объект сериализуется в JSON, кодируется в Base64 (с поддержкой Unicode)
   * и записывается в URL-параметр без перезагрузки страницы через `history.replaceState`.
   *
   * @param data - Произвольный объект для сохранения.
   */
  public save(data: Record<string, any>): void {
    const json = JSON.stringify(data)
    const encoded = encodeURIComponent(btoa(unescape(encodeURIComponent(json))))

    this.query = encoded

    const url = new URL(window.location.href)
    url.searchParams.set(this.key, encoded)
    window.history.replaceState(null, '', url.toString())

    sessionStorage.setItem(this.key, encoded)
  }

  /**
   * Загружает сохранённое состояние из URL или `sessionStorage`.
   *
   * В первую очередь проверяется URL-параметр, затем `sessionStorage`.
   * При ошибке декодирования или парсинга возвращает `null` и выводит сообщение в консоль.
   *
   * @returns Десериализованный объект состояния или `null`, если данные отсутствуют или повреждены.
   */
  public load(): Record<string, any> | null {
    const url = new URL(window.location.href)
    const encoded = url.searchParams.get(this.key) ?? sessionStorage.getItem(this.key)

    if (!encoded) return null

    try {
      const json = decodeURIComponent(escape(atob(decodeURIComponent(encoded))))

      this.query = encoded

      return JSON.parse(json)
    } catch {
      console.error(`[UrlStorage] Failed to parse state from URL (key: "${this.key}")`)
      return null
    }
  }

  /**
   * Удаляет сохранённое состояние из URL и `sessionStorage`.
   *
   * Изменение URL применяется без перезагрузки страницы.
   */
  public clear(): void {
    const url = new URL(window.location.href)
    url.searchParams.delete(this.key)
    window.history.replaceState(null, '', url.toString())

    sessionStorage.removeItem(this.key)
  }

  /**
   * Проверяет, существует ли сохранённое состояние в URL или `sessionStorage`.
   *
   * @returns `true`, если состояние найдено хотя бы в одном из источников.
   */
  public has(): boolean {
    const url = new URL(window.location.href)
    return url.searchParams.has(this.key) || sessionStorage.getItem(this.key) !== null
  }

  /**
   * Возвращает текущую закодированную строку состояния.
   *
   * Значение реактивно и обновляется после вызовов `save` и `load`.
   *
   * @returns Закодированная строка или `null`, если состояние ещё не задано.
   */
  public get query(): string | null {
    return this.data_c.value.query
  }

  /**
   * Устанавливает текущую закодированную строку состояния.
   *
   * @param query - Новое значение закодированной строки.
   */
  private set query(query: string) {
    this.data.query = query
  }
}
