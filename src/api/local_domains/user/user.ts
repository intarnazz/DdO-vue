// user.ts
import auth from '../../web_services/auth'
import storage_user from '@/storage/user'

/**
 * Класс User
 *
 * Управляет токеном пользователя с реактивностью Vue
 * и хранением в localStorage через Storage.
 */

class User {
  /**
   * Создает новый экземпляр User
   */

  auth: typeof auth
  token: typeof storage_user.token

  constructor() {
    this.auth = auth
    this.token = storage_user.token
  }
}

const user = new User()
export default user
