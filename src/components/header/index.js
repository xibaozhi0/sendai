import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './index.less'
import { Icon, Breadcrumb, Menu, Modal, Dropdown } from 'antd'
import { reqWeather } from '../../api/index'
import menuList from '../../config/menuConfig'
import LinkButton from '../link-button'
import { formateDate } from '../../utils/dateUtils'
import {connect} from 'react-redux'
import {logout} from '../../redux/actions'
class Header extends Component {
  state = {
    currentTime: formateDate(Date.now()), // 今の時間string
    dayPictureUrl: '', // 天気写真url
    weather: '' // 天気テクスト
  }
  getTitle = () => {
    // 現在のリクエストパスを取得する
    const path = this.props.location.pathname
    let title
    menuList.forEach(item => {
      if (item.key === path) {
        // 現在のアイテムオブジェクトのキーがパスと同じである場合、アイテムのタイトルは表示する必要があるタイトルです
        title = item.title
      } else if (item.children) {
        // すべてのサブアイテムで一致するアイテムを見つける
        const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)
        // 値がある場合、一致していることを意味します
        if (cItem) {
          // タイトルを奪う
          title = cItem.title
        }
      }
    })
    return title
  }
  getTime = () => {
    // 1秒ごとに現在の時刻を取得し、ステータスデータcurrentTimeを更新する
    this.intervalId = setInterval(() => {
      const currentTime = formateDate(Date.now())
      this.setState({ currentTime })
    }, 1000)
  }
  getWeather = async () => {
    // インターフェースを呼び出して非同期データ取得を要求する
    const { dayPictureUrl, weather } = await reqWeather('kunming')
    // 状態を更新
    this.setState({ dayPictureUrl, weather })
  }
  onMenuClick(key) {
    Modal.confirm({
      title: '本当にログアウトしますか?',
      okText: '確認',
      okType: 'danger',
      cancelText: 'キャンセル',
      onOk: () => {
        this.props.logout()
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  /*
  
  最初のレンダー（1）の後で1回実行されます。通常、非同期操作はここで実行されます：ajaxリクエストの送信/タイマーの開始
   */
  componentDidMount() {
    // retrieve the current time 
    this.getTime()
    // 获取当前天气　　現在の天気を取得
    this.getWeather()
  }
  /*
  現在のコンポーネントがアンインストールされる前に呼び出されます
   */
  componentWillUnmount() {
    // タイマーをクリア
    clearInterval(this.intervalId)
  }

  render() {
    const title = this.props.headTitle
    const { currentTime, dayPictureUrl, weather } = this.state
    return (
      <div className="header">
        <div className="header-top">
          <span className="menu-icon">
            {' '}
            <Icon type="menu-fold" />
          </span>
           <Dropdown
              overlay={
                <Menu onClick={this.onMenuClick.bind(this)}>
                  <Menu.Item key="1"><LinkButton>ログアウトする</LinkButton></Menu.Item>
                </Menu>
              }
              className="user-info" placement="bottomRight">
            
              <span className="ant-dropdown-link">
              <img
              src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
              alt="avatar"
            />
              welcome, {this.props.user.username}</span>
            </Dropdown>

        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">
            <Breadcrumb>
              <Breadcrumb.Item>{title}</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="header-bottom-right">
            <span>{currentTime}</span>
            <img src={dayPictureUrl} alt="weather" />
            <span>{weather}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({headTitle: state.headTitle, user: state.user}),
  {logout}
)(withRouter(Header))
