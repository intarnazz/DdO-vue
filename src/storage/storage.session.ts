export default class StorageSession<T = unknown> {
  private readonly key: string

  constructor(key: string) {
    this.key = key
  }

  save(data: T): void {
    sessionStorage.setItem(this.key, JSON.stringify(data))
  }

  load(): T | null {
    const raw = sessionStorage.getItem(this.key)
    if (raw === null) return null

    try {
      return JSON.parse(raw) as T
    } catch {
      return null
    }
  }

  clear(): void {
    sessionStorage.removeItem(this.key)
  }

  has(): boolean {
    return sessionStorage.getItem(this.key) !== null
  }
}
