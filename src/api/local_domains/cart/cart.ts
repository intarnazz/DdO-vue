import { ProductType } from '@/api/local_domains/catalog/product'
import user from '@/storage/user'

export type CartType = ProductType

class Cart {
  constructor() {}

  public add_produc(product: ProductType) {
    if (!this.products.map((p) => p.id).includes(product.id))
      this.products = [({ ...product } as Record<string, any>).data, ...this.products]
  }

  public remove_produc(product: ProductType) {
    this.products = this.products.filter((p) => p.id !== product.id)
    console.log("🚀 ~ Cart ~ remove_produc ~ this.products:", this.products)
  }

  public get products(): CartType[] {
    return user.cart
  }

  protected set products(products) {
    user.cart = products
  }
}

const cart = new Cart()
export default cart
