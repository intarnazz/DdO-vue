// // user.ts
// import { ref, computed, watch, Ref, ComputedRef } from 'vue'
// import Auth from '../../web_services/auth'
// import U from '@/storage/user'

// /**
//  * Класс User
//  *
//  * Управляет токеном пользователя с реактивностью Vue
//  * и хранением в localStorage через Storage.
//  */
// export default class User {
//   /** Экземпляр Auth */
//   #auth: Auth
//   #user: U

//   /** Экземпляр Storage для хранения токена */
//   #tokenStorage: Storage<string>

//   /** Реактивная переменная токена */
//   #token: Ref<string | null>

//   /**
//    * Создает новый экземпляр User
//    */
//   constructor() {
//     this.#auth = new Auth()
//   }
// }
