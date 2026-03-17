import { ref } from 'vue'
import type { Ref } from 'vue'

/**
 * Класс для сохранения и загрузки произвольного состояния через URL-параметры
 * с резервным хранением в `sessionStorage`.
 *
 * VueUse не покрывает URL-параметры напрямую, поэтому логика остаётся здесь.
 * Реактивность реализована через простой `ref` вместо ручного `reactive + computed`.
 *
 * @example
 * const storage = new UrlStorage('appState')
 *
 * storage.save({ page: 1, filters: { active: true } })
 * const state = storage.load()
 * if (storage.has()) { ... }
 * storage.clear()
 */
export default class UrlStorage<T = unknown> {
  /** Ключ URL-параметра и ключ записи в `sessionStorage`. */
  private key: string

  /**
   * Реактивная закодированная строка текущего состояния.
   * Используй `storage.query` для отслеживания в шаблоне или watch.
   */
  private _query: Ref<string | null>

  constructor(key: string = 'state') {
    this.key = key
    this._query = ref<string | null>(null)
  }

  /**
   * Сохраняет объект в URL и `sessionStorage`.
   */
  public save(data: T): void {
    const json = JSON.stringify(data)
    const encoded = encodeURIComponent(
      btoa(
        new TextEncoder().encode(json).reduce((acc, byte) => acc + String.fromCharCode(byte), ''),
      ),
    )

    this.query = encoded

    const url = new URL(window.location.href)
    url.searchParams.set(this.key, encoded)
    window.history.replaceState(null, '', url.toString())

    sessionStorage.setItem(this.key, encoded)
  }

  /**
   * Загружает состояние из URL или `sessionStorage`.
   * Обновляет `query` при успешной загрузке.
   *
   * @returns Десериализованный объект или `null`.
   */
  public load(): T | null {
    const url = new URL(window.location.href)
    const encoded = url.searchParams.get(this.key) ?? sessionStorage.getItem(this.key)

    if (!encoded) return null

    try {
      const json = new TextDecoder().decode(
        Uint8Array.from(atob(decodeURIComponent(encoded)), (c) => c.charCodeAt(0)),
      )
      this.query = encoded
      return JSON.parse(json)
    } catch {
      console.error(`[UrlStorage] Failed to parse state from URL (key: "${this.key}")`)
      return null
    }
  }

  /**
   * Удаляет состояние из URL и `sessionStorage`.
   */
  public clear(): void {
    const url = new URL(window.location.href)
    url.searchParams.delete(this.key)
    window.history.replaceState(null, '', url.toString())

    sessionStorage.removeItem(this.key)
    this.query = null
  }

  /**
   * Проверяет наличие состояния в URL или `sessionStorage`.
   */
  public has(): boolean {
    const url = new URL(window.location.href)
    return url.searchParams.has(this.key) || sessionStorage.getItem(this.key) !== null
  }

  public get query(): string | null {
    return this._query.value
  }

  protected set query(query: string | null) {
    this._query.value = query
  }
}
