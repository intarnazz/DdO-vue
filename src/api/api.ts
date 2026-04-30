// api
import type, { DefaultTypeInterface } from './local_domains/catalog/type/type'
import Rest from './web_services/rest'
import image from './web_services/image'
import user from './local_domains/user/user'
import filter from './local_domains/query'
import product from './local_domains/catalog/product/index'
import cart from './local_domains/cart/cart'
import { shallowRef } from 'vue'
import Product from '@/api/local_domains/catalog/product/product.model'
import { PagingInfo } from '@/api/web_services/rest-type'

/**
 * Глобальный модуль для взаимодействия с API.
 *
 * Модуль выступает посредником между методами API и компонентами бизнес-логики приложения.
 * Здесь создаются экземпляры классов для работы,
 * которые могут использоваться в любом компоненте приложения.
 */

// export const product = new Rest('product')
export const contact = new Rest('contact')
export const rest_type = new Rest('type')
export const tag = new Rest('tag')
export const brand = new Rest('brand')

export const homePageEssence = shallowRef<
  Record<
    string,
    {
      products?: Product[]
      pagingInfo?: PagingInfo
      type?: DefaultTypeInterface
      [key: string]: unknown
    }
  >
>({})

export { user, image, filter, product, type, cart }
