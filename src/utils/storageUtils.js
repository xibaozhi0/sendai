/*
ローカルデータストレージ管理用のツールモジュール
 */
import store from 'store'
const USER_KEY = 'user_key'
export default {
  /*
  save user
   */
  saveUser (user) {
    // localStorage.setItem(USER_KEY, JSON.stringify(user))
    store.set(USER_KEY, user)
  },

  /*
  retrieve user
   */
  getUser () {
    // return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
    return store.get(USER_KEY) || {}
  },

  /*
  delete user
   */
  removeUser () {
    // localStorage.removeItem(USER_KEY)
    store.remove(USER_KEY)
  }
}