import { ProductType } from '@/api/local_domains/catalog/product'
import { DefaultProductType } from '@/api/local_domains/catalog/product/types'
import user from '@/storage/user'

export interface CartItem {
  product: DefaultProductType
  count: number
  price: number
}

class Cart {
  constructor() {}

  public add_produc(cart_item: CartItem) {
    if (!this.products.map((p) => p.product.id).includes(cart_item.product.id))
      this.products = [cart_item, ...this.products]
  }

  public remove_produc(product: ProductType) {
    this.products = this.products.filter((p) => p.product.id !== product.id)
  }

  public get products(): CartItem[] {
    return user.cart
  }

  protected set products(products) {
    user.cart = products
  }
}

const cart = new Cart()
export default cart
