import React, {Component} from 'react'
import { PAGE_SIZE } from '../../utils/constants'
import {
  Card,
  Button,
  Table,
  Modal,
  message,
  Divider
} from 'antd'
import {formateDate} from "../../utils/dateUtils"
import {reqDeleteUser, reqUsers, reqAddOrUpdateUser} from "../../api/index";
import UserForm from './user-form'

/*
ユーザーロート
 */
export default class User extends Component {

  state = {
    users: [], // すべてのユーザーリスト
    roles: [], // すべてのロールリスト
    isShow: false, // 確認ボックスを表示するかどうか
  }

  initColumns = () => {
    this.columns = [
      {
        title: 'ユーザー名',
        dataIndex: 'username'
      },
      {
        title: 'メール',
        dataIndex: 'email'
      },

      {
        title: '電話',
        dataIndex: 'phone'
      },
      {
        title: 'レジストリ時間',
        dataIndex: 'create_time',
        render: formateDate
      },
      {
        title: '役割',
        dataIndex: 'role_id',
        render: (role_id) => this.roleNames[role_id]
      },
      {
        title: '操作',
        render: (user) => (
          <span >
          <b onClick={() => this.showUpdate(user)} className="ant-dropdown-link">修正</b>
          <Divider type="vertical" />
          <b onClick={() => this.deleteUser(user)} className="ant-dropdown-link">削除</b>
          </span>

        )
      },
    ]
  }

  /*
 ロール配列に従って、すべてのロール名を含むオブジェクトを生成します（プロパティ名はロールID値を使用します）
   */
  initRoleNames = (roles) => {
    const roleNames = roles.reduce((pre, role) => {
      pre[role._id] = role.name
      return pre
    }, {})
    // 保存
    this.roleNames = roleNames
  }

  /*
  显示添加界面
   */
  showAdd = () => {
    this.user = null // 以前に保存したユーザーを削除する
    this.setState({isShow: true})
  }

  /*
  显追加インターフェースを表示
   */
  showUpdate = (user) => {
    this.user = user // ユーザーを保存
    this.setState({
      isShow: true
    })
  }

  /*
  指定ユーザーを削除
   */
  deleteUser = (user) => {
    Modal.confirm({
      title: `${user.username}削除しますか?`,
      onOk: async () => {
        const result = await reqDeleteUser(user._id)
        if(result.status===0) {
          message.success('ユーザーを削除しました!')
          this.getUsers()
        }
      }
    })
  }

  /*
  ユーザーを追加/更新
   */
  addOrUpdateUser = async () => {

    this.setState({isShow: false})

    // 1. 入力データを回収
    const user = this.form.getFieldsValue()
    this.form.resetFields()
    // 更新された場合、ユーザーに_id属性を指定する必要があります
    if (this.user) {
      user._id = this.user._id
    }

    // 2. 追加/更新するリクエスト
    const result = await reqAddOrUpdateUser(user)
    // 3.　追加/更新を表示
    if(result.status===0) {
      message.success(`${this.user ? 'ユーザーを修正' : 'ユーザーを追加'}しました`)
      this.getUsers()
    }
  }

  getUsers = async () => {
    const result = await reqUsers()
    if (result.status===0) {
      const {users, roles} = result.data
      this.initRoleNames(roles)
      this.setState({
        users,
        roles
      })
    }
  }

  componentWillMount () {
    this.initColumns()
  }

  componentDidMount () {
    this.getUsers()
  }


  render() {

    const {users, roles, isShow} = this.state
    const user = this.user || {} // null 防止

    const title = <Button type='primary' onClick={this.showAdd}>ユーザーを作成</Button>

    return (
      <Card title={title}>
        <Table
          bordered
          rowKey='_id'
          dataSource={users}
          columns={this.columns}
          pagination={{defaultPageSize: PAGE_SIZE}}
        />

        <Modal
          title={user._id ? 'ユーザーを修正' : 'ユーザーを追加'}
          visible={isShow}
          onOk={this.addOrUpdateUser}
          onCancel={() => {
            this.form.resetFields()
            this.setState({isShow: false})
          }}
        >
          <UserForm
            setForm={form => this.form = form}
            roles={roles}
            user={user}
          />
        </Modal>

      </Card>
    )
  }
}