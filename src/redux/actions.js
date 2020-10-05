/*
n個のaction creator関数を含むモジュール
同期action: オブジェクト　{type: 'xxx', data: データ値}
非同期action: 関数  dispatch => {}
 */
import {
  SET_HEAD_TITLE,
  RECEIVE_USER,
  SHOW_ERROR_MSG,
  RESET_USER,
  CLEAR_LOGOUT
} from './action-types'
import {reqLogin} from '../api'
import storageUtils from "../utils/storageUtils";

/*
ヘッダーの同期actionを設定する
 */
export const setHeadTitle = (headTitle) => ({type: SET_HEAD_TITLE, data: headTitle})

export const clearLogout = (reamrk) => ({type: CLEAR_LOGOUT, data:reamrk})
/*
ユーザー同期actionを受信する
 */
export const receiveUser = (user) => ({type: RECEIVE_USER, user})

/*
エラーメッセージの同期アクションを表示する
 */
export const showErrorMsg = (errorMsg) => ({type: SHOW_ERROR_MSG, errorMsg})

/*
同期されたアクションからログアウトする
 */
export const logout = () =>  {
  // localのuserを削除
  storageUtils.removeUser()
  // action　オブジェクトを戻り
  return {type: RESET_USER, 'logout':'logout'}
}

/*
非同期action
 */
export const login = (username, password) => {
  return async dispatch => {
    // 1.非同期Ajaxリクエストを実行する
    const result = await reqLogin(username, password)  // {status: 0, data: user} {status: 1, msg: 'xxx'}
    // 2.1. 成功した場合、成功した同期actionを配布します
    if(result.status===0) {
      const user = result.data
      // localの中を保存
      storageUtils.saveUser(user)
      // 受信ユーザーの同期actionを配布する
      dispatch(receiveUser(user))
    } else { // 2.2. 失敗した場合、失敗した同期actionを配布する
      const msg = result.msg
      // message.error(msg)
      dispatch(showErrorMsg(msg))
    }

  }
}
