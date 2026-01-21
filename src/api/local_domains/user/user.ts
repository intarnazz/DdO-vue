// user.ts
import Auth from '../../web_services/auth'

/**
 * Класс User
 *
 * Управляет токеном пользователя с реактивностью Vue
 * и хранением в localStorage через Storage.
 */

class User extends Auth {
  /**
   * Создает новый экземпляр User
   */
  constructor() {
    super()
  }
}

const user = new User()
export default user
