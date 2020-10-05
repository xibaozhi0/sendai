/*
非同期ajaxリクエストを送信できる汎用モジュールは、
axiosライブラリ関数をカプセル化します戻り値はpromiseオブジェクトです
1.最適化1：リクエスト例外を均一に処理しますか？外側のパッケージでは、それ自体で作成されたpromiseオブジェクトは拒否されません（エラー）エラープロンプトを表示
2.最適化2：非同期応答は応答ではなく、response.data要求が正常に解決された場合：resolve（response.data）
 */

import axios from 'axios'
import { message } from 'antd'

export default function ajax(url, data = {}, type = 'GET', callback = false) {
  if (callback && typeof callback == 'function') {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
          resolve(callback(data))
        }, parseInt(Math.random() * 1500))
    })
  }
  return new Promise((resolve, reject) => {
    let promise
    //非同期Ajaxリクエストを実行する
    if (type === 'GET') {
      // GET　リクエスト
      promise = axios.get(url, {
        // 構成オブジェクト
        params: data // リクエストパラメーターの指定
      })
    } else {
      // POST　リクエスト
      promise = axios.post(url, data)
    }
    // 2. 成功した場合、resolve(value)を呼び出します
    promise
      .then(response => {
        resolve(response.data)
        // 3. 失敗した場合、reject(reason)は呼び出されませんが、例外メッセージが表示されます
      })
      .catch(error => {
        // reject(error)
        message.error('リクエスト: ' + error.message)
      })
  })
}

// ログインリクエスト　INTERFACE
// ajax('/login', {username: 'Tom', passsword: '12345'}, 'POST').then()
// ユーザーを入れる
// ajax('/manage/user/add', {username: 'Tom', passsword: '12345', phone: '13712341234'}, 'POST').then()
