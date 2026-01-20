// user.ts
import auth from '../../web_services/auth'

/**
 * Класс User
 *
 * Управляет токеном пользователя с реактивностью Vue
 * и хранением в localStorage через Storage.
 */

class User {
  /** Экземпляр Auth */
  #auth: typeof auth

  /**
   * Создает новый экземпляр User
   */
  constructor() {
    this.#auth = auth
  }

  get auth(): typeof auth {
    return this.#auth
  }
}

const user = new User()
export default user
