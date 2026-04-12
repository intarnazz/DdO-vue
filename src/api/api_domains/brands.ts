import { brand as brandApi } from '@/api/api'
import { Brand } from '@/api/api_domains/brand'
import { CatalogModel } from '@/models/CatalogModel'

class BrandsModel extends CatalogModel<Brand> {
  async load(limit: number = 99): Promise<void> {
    if (!this.hasMore) return

    const res = await brandApi.all({
      limit: limit,
      offset: this.count,
    })

    if (!res.success) return

    if (res.data) this.setItems(res.data, Brand)
    this.setPaging(res.pagingInfo)
  }
}

export const brands = new BrandsModel()
