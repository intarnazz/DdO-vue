import router from '@/router/router'

export default class UrlStorage {
  /**
   * Сохраняет объект в URL через router.replace()
   */
  public save<T extends Record<string, unknown>>(options: T): void {
    const query: Record<string, string> = {}

    Object.keys(options).forEach((key) => {
      const value = options[key]
      if (!value) return
      query[key] = String(value)
    })

    router.push({ query })
  }

  /**
   * Очищает все query-параметры через router.replace()
   */
  public clear(): void {
    router.push({ query: {} })
  }
}
