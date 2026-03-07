// api
import type from './local_domains/catalog/type/type'
import Rest from './web_services/rest'
import image from './web_services/image'
import user from './local_domains/user/user'
import filter from './local_domains/filter/filter'
import product from './local_domains/catalog/product/index'

/**
 * Глобальный модуль для взаимодействия с API.
 *
 * Модуль выступает посредником между методами API и компонентами бизнес-логики приложения.
 * Здесь создаются экземпляры классов для работы,
 * которые могут использоваться в любом компоненте приложения.
 */

// export const product = new Rest('product')
export const contact = new Rest('contact')
export const tag = new Rest('tag')

export { user, image, filter, product, type }
