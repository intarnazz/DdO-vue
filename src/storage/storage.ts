/**
 * Класс Storage
 *
 * Универсальный менеджер для работы с localStorage.
 * Позволяет хранить, получать и удалять значения любого типа T.
 *
 * @template T - тип значения, которое будет храниться
 */
export default class Storage<T = any> {
  /** Ключ в localStorage */
  private key: string

  /**
   * Создает экземпляр Storage для указанного ключа
   *
   * @param key - ключ для хранения значения в localStorage
   */
  constructor(key: string) {
    this.key = key
  }

  /**
   * Получить значение из localStorage
   *
   * Если значения нет или произошла ошибка при парсинге JSON, возвращает null.
   *
   * @returns {T | null} Значение из localStorage или null
   */
  public get(): T | null {
    const item = localStorage.getItem(this.key)
    if (!item) return null

    try {
      return JSON.parse(item) as T
    } catch (error) {
      console.error(`Ошибка при парсинге JSON для ключа "${this.key}":`, error)
      return null
    }
  }

  /**
   * Сохранить значение в localStorage
   *
   * @param value - значение типа T для сохранения
   */
  public set(value: T): void {
    try {
      const json = JSON.stringify(value)
      localStorage.setItem(this.key, json)
    } catch (error) {
      console.error(`Ошибка при сохранении JSON для ключа "${this.key}":`, error)
    }
  }

  /**
   * Удалить значение из localStorage
   */
  public remove(): void {
    localStorage.removeItem(this.key)
  }
}
