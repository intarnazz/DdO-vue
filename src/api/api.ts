// api
import { Rest } from './services/rest'
import { Image } from './services/image'
import { Auth } from './services/auth'

/**
 * Глобальный модуль для взаимодействия с API.
 *
 * Модуль выступает посредником между методами API и компонентами бизнес-логики приложения.
 * Здесь создаются экземпляры классов для работы,
 * которые могут использоваться в любом компоненте приложения.
 */

export const product = new Rest('product')

export const image = new Image()
export const auth = new Auth()
