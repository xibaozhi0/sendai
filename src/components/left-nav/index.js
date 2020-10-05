import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import './index.less'
import { Menu, Icon } from 'antd'
import menuList from '../../config/menuConfig'
import {connect} from 'react-redux'
import {setHeadTitle} from '../../redux/actions'
import logo from './images/logo512.png'

const { SubMenu } = Menu
/**
 * 左ナビゲーションのコンポーネント
 */
class LeftNav extends Component {
  componentWillMount() {
    this.menuNodes = this.getMenuNodes(menuList)
  }
  render() {
    let path = this.props.location.pathname
    if (path.indexOf('/product') === 0) {
      // 現在のリクエストは製品またはその子ルーティングインターフェイス
      path = '/product'
    }
    const openKey = this.openKey
    return (
      <div className="left-nav">
        <Link to="/">
          <header className="left-nav-header">
            <img
              src={logo}
              alt="logo"
            />
            <h1>なし</h1>
          </header>
        </Link>

        <Menu
          mode="inline"
          selectedKeys={[path]}
          defaultOpenKeys={[openKey]}
          style={{ padding: '16px 0px' }}
        >
          {this.menuNodes}
        </Menu>
      </div>
    )
  }
  hasAuth = (item) => {
    const {key, isPublic} = item

    const menus = this.props.user.role.menus
    /*
    1. 現在のユーザーが管理者の場合
    2. 現在のアイテムがパブリックの場合
    3. 現在のユーザーには、このアイテムに対する権限があります。キーにはメニューがありますか
     */
    if(isPublic || menus.indexOf(key)!==-1) {
      return true
    } else {
      return false
    }
  }
  getMenuNodes = menuList => {
    const path = this.props.location.pathname
    return menuList.map(item => {
      if (this.hasAuth(item) === false) {
          return ''
      }
      if (item.children) {
        const citem = item.children.find(citem => path.indexOf(citem.key) === 0)
        if (citem) {
          this.openKey = item.key
          this.props.setHeadTitle(item.title)
        }
        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNodes(item.children)}
          </SubMenu>
        )
      } else {
        if (item.key === path || path.indexOf(item.key) === 0) {
          this.props.setHeadTitle(item.title)
        }
        return (
          <Menu.Item key={item.key}>
            <Link to={item.key} onClick={() => this.props.setHeadTitle(item.title)}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        )
      }
    })
  }
}
export default connect(
  state => ({user: state.user}),
  {setHeadTitle}
)(withRouter(LeftNav))
