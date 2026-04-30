import { rest_type } from '@/api/api'
import { Type } from '@/api/api_domains/type/type'
import { CatalogModel } from '@/models/catalogModel'

class TypesModel extends CatalogModel<Type> {
  async load(limit: number = 99): Promise<void> {
    if (!this.hasMore) return

    const res = await rest_type.all({
      limit: limit,
      offset: this.count,
      order: 'id',
    })

    if (!res.success) return

    if (res.data) this.setItems(res.data, Type)
    this.setPaging(res.pagingInfo)
  }
}

export const types = new TypesModel()
