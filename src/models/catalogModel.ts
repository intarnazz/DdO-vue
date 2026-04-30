import { computed, reactive, shallowRef } from 'vue'
import { buildArray } from '@/api/builders/builders'
import { PagingInfo, pagingInfoBuilder } from '@/api/web_services/rest-type'

export class CatalogModel<T> {
  private _items = shallowRef<T[]>([])
  public pagingInfo = reactive<PagingInfo>(pagingInfoBuilder())

  private _count = computed<number>(() => this.pagingInfo.limit + this.pagingInfo.offset)
  private _hasMore = computed<boolean>(
    () => this.pagingInfo.totalCount > this.count || this.count === 0,
  )

  get items(): T[] {
    return this._items.value
  }

  get count(): number {
    return this._count.value
  }

  get hasMore(): boolean {
    return this._hasMore.value
  }

  protected setItems(raw: Partial<T>[], Model: new (data: Partial<T>) => T): void {
    this.items.push(...buildArray(Model, raw))
    this._items.value = [...this.items]
  }

  protected setPaging(info?: Partial<PagingInfo>): void {
    Object.assign(this.pagingInfo, pagingInfoBuilder(info))
  }
}
