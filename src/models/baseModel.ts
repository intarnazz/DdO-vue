import { ComputedRef } from 'vue'

export default class BaseModel {
  protected toNum = (v: unknown, def: number = 0) => (v != null ? Number(v) : def)
  protected toStr = (v: unknown, def: string = '') => (v != null ? String(v) : def)

  protected objectFilter = <T extends Record<string, unknown>>(
    obj: ComputedRef<T>,
    foo: (key: string, value: unknown) => boolean,
  ): Partial<T> => {
    return Object.fromEntries(
      Object.entries(obj.value).filter(([key, value]) => foo(key, value)),
    ) as Partial<T>
  }
}
