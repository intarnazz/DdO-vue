import ProductService from './product.service'

export type { ProductType } from './types'

/** Singleton-экземпляр сервиса продуктов для использования во всём приложении */
const product = new ProductService()

export default product
