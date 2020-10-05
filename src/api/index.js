/*
要件：インターフェース文書に従ってインターフェース要求を定義できる
アプリケーション内のすべてのインターフェース要求関数を含むモジュール
各関数の戻り値は約束基本要件：インターフェース文書に従ってインターフェース要求関数を定義できる
//  */
// import jsonp from 'jsonp'
import ajax from './ajax'
import jsonp from 'jsonp'
import CateGory from './cate'
import Rule from './rule'
import Product from './product'
import User from './user'
import { message } from 'antd'
import md5 from 'md5'
// const BASE = 'http://localhost:5000'
const BASE = ''
// ログイン
/*
export function reqLogin(username, password) {
  return ajax('/login', {username, password}, 'POST')
}*/
export const reqLogin = (username, password) =>
  ajax(BASE + '/login', { username, password }, 'POST', data => {
    console.log(data)
    const user =  User.users.find((item) => {
      return data.username === item.username && data.password === item.password
    })
    console.log(user)
    if (user) {
      const rule = Rule.find((item) => {
          return item._id === user.role_id
      })
      user.role = {
        menus:rule.menus
      }
      return {
        status: 0,
        data:user
      }
    } else {
      return JSON.parse('{"status":1,"msg":"用ユーザー名またはパスワードが間違っています"}')
    }
  })

// 一次/二次分類のリストを取得する
export const reqCategorys = parentId =>
  ajax(BASE + '/manage/category/list', { parentId }, 'GET', data => {
    return CateGory.filter(item => item.parentId === data.parentId.toString())
  })

// カテゴリを追加
export const reqAddCategory = (categoryName, parentId) =>
  ajax(
    BASE + '/manage/category/add',
    { categoryName, parentId },
    'POST',
    data => {
      CateGory.push({
        parentId: data.parentId,
        _id: md5(data.parentId + new Date().getTime()),
        name: data.categoryName
      })
    }
  )

// 更新カテゴリ
export const reqUpdateCategory = ({ categoryId, categoryName }) =>
  ajax(
    BASE + '/manage/category/update',
    { categoryId, categoryName },
    'POST',
    data => {
      const res = CateGory.find(item => item._id === data.categoryId.toString())
      res.name = data.categoryName
      return { status: 0, msg: '成功' }
    }
  )

// カテゴリーを取得する
export const reqCategory = categoryId =>
  ajax(BASE + '/manage/category/info', { categoryId }, 'GET', data => {
    console.log(data)
    const res = CateGory.find(item => {
      return (item._id = data.categoryId)
    })
    return { status: 0, msg: '成功', data: res }
  })

function getImagesAndCate(data) {
  data.forEach(item => {
    if (!item.imgs) {
      item.imgs = [
        'https://img10.360buyimg.com/n1/jfs/t1/70791/30/9837/99509/5d7809abEabb3dd71/162f3d53c477a87f.jpg',
        'https://img11.360buyimg.com/n1/s450x450_jfs/t1/3251/37/3455/82542/5b997bf4E6336f987/83d512f576675ad7.jpg',
        'https://img13.360buyimg.com/n1/s450x450_jfs/t1/5904/24/3505/86713/5b997bfdE0b92cffc/e194ac061516de9d.jpg'
      ]
    }
    if (!item.pCategoryId) {
      const cate = CateGory[Math.floor(Math.random() * CateGory.length)]
      item.pCategoryId = cate.parentId
      item.categoryId = cate._id
    }
  })
  return data
}
// 製品のページ分割リストを取得する
export const reqProducts = (pageNum, pageSize) =>
  ajax(BASE + '/manage/product/list', { pageNum, pageSize }, 'GET', data => {
    let page = (data.pageNum - 1) * data.pageSize
    let res = Product.slice(page, page + data.pageSize)
    return {
      status: 0,
      data: {
        pageNum: pageNum,
        pageSize: pageSize,
        total: Product.length,
        list: getImagesAndCate(res)
      }
    }
  })

// 製品のステータスを更新します（オン/オフの棚）
export const reqUpdateStatus = (productId, status) =>
  ajax(
    BASE + '/manage/product/updateStatus',
    { productId, status },
    'POST',
    data => {
      const res = Product.find(item => {
        return item._id === data.productId
      })
      res.status = data.status
      return { status: 0, msg: '成功' }
    }
  )

/*
製品のページ分割リストを検索する（製品名/製品の説明に基づいて）
searchType: 検索のタップ, productName/productDesc
 */
export const reqSearchProducts = ({
  pageNum,
  pageSize,
  searchName,
  searchType
}) =>
  ajax(
    BASE + '/manage/product/search',
    {
      pageNum,
      pageSize,
      [searchType]: searchName
    },
    'GET',
    data => {
      console.log(data)
      let tempProduct = [...Product]
      tempProduct = tempProduct.filter(item => {
        item.imgs = []
        if (data['productName']) {
          return item.name.indexOf(data['productName']) !== -1
        } else {
          return item.desc.indexOf(data['productDesc']) !== -1
        }
      })
      console.log(tempProduct)
      let page = (data.pageNum - 1) * data.pageSize
      let res = tempProduct.slice(page, page + data.pageSize)
      return {
        status: 0,
        data: {
          pageNum: pageNum,
          pageSize: pageSize,
          total: tempProduct.length,
          list: getImagesAndCate(res)
        }
      }
    }
  )

// 搜索商品分页列表 (根据商品描述)　製品ページ分割リストを検索する
/*export const reqSearchProducts2 = ({pageNum, pageSize, searchName}) => ajax(BASE + '/manage/product/search', {
  pageNum,
  pageSize,
  productDesc: searchName,
})*/

// 　指定した名前の画像を削除
export const reqDeleteImg = name =>
  ajax(BASE + '/manage/img/delete', { name }, 'POST')

// 商品を追加/更新
export const reqAddOrUpdateProduct = product =>
  ajax(
    BASE + '/manage/product/' + (product._id ? 'update' : 'add'),
    product,
    'POST',
    data => {
      if (data._id) {
        let key = null
        let res = Product.find((item, index) => {
          if (item._id === data._id) {
            key = index
            return true
          }
          return false
        })

        Product[key] = { ...res, ...data }
      } else {
        Product.push({
          _id: md5(data + new Date().getTime()),
          status: '1',
          ...data
        })
      }
      return {
        status: 0,
        mag: '成功'
      }
    }
  )
// 商品を更新
// export const reqUpdateProduct = (product) => ajax(BASE + '/manage/product/update', product, 'POST')

// 全ての役割リストを取得
export const reqRoles = () =>
  ajax(BASE + '/manage/role/list', {}, 'GET', () => {
    return {
      status: 0,
      data: Rule
    }
  })
// 役割を追加
export const reqAddRole = roleName =>
  ajax(BASE + '/manage/role/add', { roleName }, 'POST', data => {
    const res = {
      menus: [],
      _id: md5(data.roleName + new Date().getTime()),
      name: roleName,
      create_time: new Date().getTime(),
      __v: 0,
      auth_time: null,
      auth_name: null
    }
    return {
      status: 0,
      msg: '成功',
      data: res
    }
  })
// 役割を追加
export const reqUpdateRole = role =>
  ajax(BASE + '/manage/role/update', role, 'POST', data => {
    let res = Rule.find(item => {
      return item._id === data._id
    })
    res = { ...res, ...data }
    return {
      status: 0,
      msg: '成功',
      data: res
    }
  })

// すべてのユーザーのリストを取得する
export const reqUsers = () =>
  ajax(BASE + '/manage/user/list', {}, 'GET', () => {
    User.users.forEach(item => {
      const rule = Rule[Math.floor(Math.random() * Rule.length)]
      item.role_id = rule._id
    })
    User.roles = Rule
    return {
      status: 0,
      msg: '成功',
      data: User
    }
  })
// 指定したユーザーを削除
export const reqDeleteUser = userId =>
  ajax(BASE + '/manage/user/delete', { userId }, 'POST', data => {
    const users = User.users.filter(item => {
      return item._id !== data.userId
    })
    User.users = users
    return {
      status: 0,
      msg: '成功'
    }
  })
// ユーザーを追加/更新
export const reqAddOrUpdateUser = user =>
  ajax(BASE + '/manage/user/' + (user._id ? 'update' : 'add'), user, 'POST', data => {
    if (data._id) {
      let key = null
      let res = User.users.find((item, index) => {
        if (item._id === data._id) {
          key = index
          return true
        }
        return false
      })

      User.users[key] = { ...res, ...data }
    } else {
      User.users.push({
        _id: md5(data + new Date().getTime()),
        create_time: new Date().getTime(),
        ...data
      })
    }
    return {
      status: 0,
      msg: '成功'
    }
  })

/*
json要求されたインターフェース要求機能
 */
export const reqWeather = city => {
  return new Promise((resolve, reject) => {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    
    // 　jsonリクエストを送信
    jsonp(url, {}, (err, data) => {
      // もし成功の場合
      if (!err && data.status === 'success') {
        // 必要なデータを取り出し
        const { dayPictureUrl, weather } = data.results[0].weather_data[0]
        resolve({ dayPictureUrl, weather })
      } else {
        // 　失敗の場合
        message.error('天気予報がありません!')
      }
    })
  })
}
// reqWeather('北京')
/*
Ajaxクロスドメインを解決するjsonの原理
  1). jsonはGETタイプのAjaxリクエストのクロスドメイン問題のみを解決できます
  2). jsonリクエストはAjaxリクエストではなく、一般のGETリクエストです
  3). 基本原理
  ブラウザ側
     <script>を動的に生成してバックグラウンドインターフェイスを要求します（srcはインターフェイスのURLです） 动态生成<script>来请求后台接口(src就是接口的url)
     応答データを受信するための関数（fn）を定義し、要求パラメーターを介して関数名をバックグラウンドに送信します（たとえば、コールバック= fn）
  サーバー側：
      結果データを生成する要求処理を受け取った後、関数呼び出しのjsコードを返し、結果データを引数として関数呼び出しに渡します
   ブラウザ側
     応答を受信した後、関数呼び出しを自動的に実行するjsコードは、事前に定義されたコールバック関数も実行し、必要な結果データを取得します
 */
