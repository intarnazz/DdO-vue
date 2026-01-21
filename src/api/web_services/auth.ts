import user from '@/storage/user'
import { PostBody, request } from './request/request'

class Auth {
  /** Функция для выполнения POST-запросов к API */
  #request: typeof request
  #user: typeof user

  /**
   * Создает экземпляр Auth.
   * Привязывает внутреннюю функцию POST-запроса к API.
   */
  constructor() {
    this.#request = request
    this.#user = user
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
  public async reg<T = { success: boolean; token?: string; message?: string }>(
    body: PostBody,
  ): Promise<T> {
    const res = await this.#request.post<T>('registration', body)
    if ((res as any).success) {
      this.#user.setToken((res as any).token)
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
  public async login<T = { success: boolean; token?: string; message?: string }>(
    body: PostBody,
  ): Promise<T> {
    const res = await this.#request.post<T>('authorization', body)
    if ((res as any).success) {
      this.#user.setToken((res as any).token)
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
  public async logout<T = { success: boolean; message?: string }>(): Promise<T> {
    this.#user.unsetToken()
    location.reload()
    const res = await this.#request.post<T>('logout')
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
  public async user<T = { success: boolean; message?: string; [key: string]: any }>(): Promise<T> {
    const res = await this.#request.post<T>('profile')
    if (!(res as any).success && (res as any).message === 'Unauthenticated.') {
      await this.logout()
    }
    return res
  }
}

const auth = new Auth()
export default auth
