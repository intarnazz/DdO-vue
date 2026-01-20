// api
import Rest from './web_services/rest'
import Image from './web_services/image'
// import User from './local_domains/user/user'

/**
 * Глобальный модуль для взаимодействия с API.
 *
 * Модуль выступает посредником между методами API и компонентами бизнес-логики приложения.
 * Здесь создаются экземпляры классов для работы,
 * которые могут использоваться в любом компоненте приложения.
 */

export const product = new Rest('product')

// export const user = new User()

export const image = new Image()
