import { Post, PostBody } from './post/Post'
import User from '@/storage/user'

/**
 * Экземпляр текущего пользователя.
 * Отвечает за хранение и управление токеном аутентификации.
 */
const user = new User()

/**
 * Класс для управления авторизацией пользователей.
 * Поддерживает регистрацию, вход, выход и получение данных текущего пользователя.
 */
export class Auth {
  /** Функция для выполнения POST-запросов к API */
  #Post: <T = unknown>(url: string, body?: PostBody) => Promise<T>

  /**
   * Создает экземпляр Auth.
   * Привязывает внутреннюю функцию POST-запроса к API.
   */
  constructor() {
    this.#Post = Post
  }

  /**
   * Регистрация нового пользователя.
   * @param body - Данные для регистрации, например, { username, password }
   * @typeParam T - Тип объекта, который возвращает сервер в ответе
   * @returns Промис с объектом ответа сервера
   *
   * @example
   * interface RegistrationResponse { success: boolean; token?: string }
   * const res = await auth.reg<RegistrationResponse>({ username: 'admin', password: '1234' })
   */
  async reg<T = { success: boolean; token?: string; message?: string }>(
    body: PostBody,
  ): Promise<T> {
    const res = await this.#Post<T>('registration', body)
    if ((res as any).success) {
      user.setToken((res as any).token)
    }
    return res
  }

  /**
   * Вход пользователя в систему.
   * @param body - Данные для авторизации, например, { username, password }
   * @typeParam T - Тип объекта, который возвращает сервер в ответе
   * @returns Промис с объектом ответа сервера
   *
   * @example
   * interface LoginResponse { success: boolean; token?: string }
   * const res = await auth.login<LoginResponse>({ username: 'admin', password: '1234' })
   */
  async login<T = { success: boolean; token?: string; message?: string }>(
    body: PostBody,
  ): Promise<T> {
    const res = await this.#Post<T>('authorization', body)
    if ((res as any).success) {
      user.setToken((res as any).token)
    }
    return res
  }

  /**
   * Выход пользователя из системы.
   * Удаляет токен из хранилища и перезагружает страницу.
   * @typeParam T - Тип объекта, который возвращает сервер в ответе
   * @returns Промис с объектом ответа сервера
   *
   * @example
   * interface LogoutResponse { success: boolean; message?: string }
   * const res = await auth.logout<LogoutResponse>()
   */
  async logout<T = { success: boolean; message?: string }>(): Promise<T> {
    user.unsetToken()
    location.reload()
    const res = await this.#Post<T>('logout')
    return res
  }

  /**
   * Получение данных текущего пользователя.
   * Если пользователь не аутентифицирован, выполняется автоматический выход (logout).
   * @typeParam T - Тип объекта, который возвращает сервер в ответе
   * @returns Промис с объектом профиля пользователя
   *
   * @example
   * interface UserProfile { success: boolean; username?: string; email?: string }
   * const profile = await auth.user<UserProfile>()
   */
  async user<T = { success: boolean; message?: string; [key: string]: any }>(): Promise<T> {
    const res = await this.#Post<T>('profile')
    if (!(res as any).success && (res as any).message === 'Unauthenticated.') {
      await this.logout()
    }
    return res
  }
}
