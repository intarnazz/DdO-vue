import { ProductType } from '@/api/local_domains/catalog/product'
import { DefaultProductType } from '@/api/local_domains/catalog/product/types'
import user from '@/storage/user'
import { computed } from 'vue'

export interface CartItem {
  product: DefaultProductType
  price: number
  count: number
}

class Cart {
  private _total_price = computed<number>(() =>
    this.products.reduce((sum, p) => sum + p.price * p.count, 0),
  )

  public add_produc(cart_item: CartItem) {
    if (!this.products.map((p) => p.product.id).includes(cart_item.product.id))
      this.products = [cart_item, ...this.products]
  }

  public remove_produc(product: ProductType) {
    this.products = this.products.filter((p) => p.product.id !== product.id)
  }

  public get_product(id: number): CartItem | undefined {
    return this.products.find((p) => p.product.id === id)
  }

  public get products(): CartItem[] {
    return user.cart
  }

  protected set products(products) {
    user.cart = products
  }
  public get total_price(): number {
    return this._total_price.value
  }
}

const cart = new Cart()
export default cart
