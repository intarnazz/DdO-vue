import { brand as brandApi } from '@/api/api'
import { Brand } from '@/api/api_domains/brand/brand'
import PromiseController from '@/api/web_services/promiseController'
import { CatalogModel } from '@/models/catalogModel'

class BrandsModel extends CatalogModel<Brand> {
  private promiseController = new PromiseController()

  async load(limit: number = 99): Promise<void> {
    if (!this.hasMore) return

    const res = await this.promiseController.await((signal) =>
      // prettier-ignore
      brandApi.all({
        signal: signal,
        limit : limit,
        offset: this.count,
        order : 'id',
      }),
    )

    if (!res) return
    if (!res.success) return

    if (res.data) this.setItems(res.data, Brand)
    this.setPaging(res.pagingInfo)
  }

  public get is_loading() { return this.promiseController.is_loading } // prettier-ignore
}

export const brands = new BrandsModel()
