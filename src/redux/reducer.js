/*
古い状態と指定されたアクションに基づいて新しい状態を生成して返すために使用される関数
 */
import {combineReducers} from 'redux'

/*
ヘッダータイトルを管理するためのリデューサー関数
 */
import storageUtils from "../utils/storageUtils"
import {
  SET_HEAD_TITLE,
  RECEIVE_USER,
  SHOW_ERROR_MSG,
  RESET_USER,
  CLEAR_LOGOUT
} from './action-types'

const initHeadTitle = ''

function headTitle(state = initHeadTitle, action) {
  switch (action.type) {
    case SET_HEAD_TITLE:
      return action.data
    default:
      return state
  }
}

/*
現在ログインしているユーザーを管理するためのリデューサー機能
 */
const initUser = storageUtils.getUser()
function user(state = initUser, action) {
  switch (action.type) {
    case RECEIVE_USER:
      return action.user
    case SHOW_ERROR_MSG:
      const errorMsg = action.errorMsg
      // state.errorMsg = errorMsg  // 元のステータスデータを直接変更しないでください
      return {...state, errorMsg}
    case RESET_USER:
      return {logout:action.logout}
    case CLEAR_LOGOUT:
      console.log({...state, [action.data]:null})
      return {...state, [action.data]:null}
    default:
      return state
  }
}

/*
向外默认暴露的是合并产生的总的reducer函数
管理的总的state的结构:
  {
    headTitle: '首页',
    user: {}
  }
 */
export default combineReducers({
  headTitle,
  user
})