import { computed, reactive, shallowRef } from 'vue'
import { PagingInfo, pagingInfoBuilder } from '@/api/web_services/rest'
import { buildArray } from '@/api/builders/builders'

export class CatalogModel<T> {
  public items = shallowRef<T[]>([])
  public pagingInfo = reactive<PagingInfo>(pagingInfoBuilder())

  private _count = computed<number>(() => this.pagingInfo.limit + this.pagingInfo.offset)
  private _hasMore = computed<boolean>(() => this.pagingInfo.totalCount > this.count)

  get count(): number {
    return this._count.value
  }

  get hasMore(): boolean {
    return this._hasMore.value
  }

  protected setItems(raw: Partial<T>[], Model: new (data: Partial<T>) => T): void {
    this.items.value.push(...buildArray(Model, raw))
    this.items.value = [...this.items.value]
  }

  protected setPaging(info?: Partial<PagingInfo>): void {
    Object.assign(this.pagingInfo, pagingInfoBuilder(info))
  }
}
