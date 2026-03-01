import { product, type } from '@/api/api'

class Composer {
  public async essence_init(params: Record<string, string>) {
    if (params.type) {
      type.type.name !== params.type ? await type.init(params.type) : null
      if (params.id && Number(params.id) !== product.product.id)
        product.product.init(Number(params.id))
    }
  }
}

const composer = new Composer()
export default composer
