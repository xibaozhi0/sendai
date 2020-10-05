import React, { Component } from 'react'
import { Card, Button, Table, Modal, message } from 'antd'

import { PAGE_SIZE } from '../../utils/constants'
import { reqRoles, reqAddRole, reqUpdateRole } from '../../api'
import AddForm from './add-form'
import AuthForm from './auth-form'
import { formateDate } from '../../utils/dateUtils'
import {connect} from 'react-redux'
// import {logout} from '../../redux/actions'

/*
ロールルーティング
 */
class Role extends Component {
  state = {
    roles: [], // 全キャラクター一覧
    role: {}, // 選択したrole
    isShowAdd: false, // 追加インターフェースを表示するかどうか
    isShowAuth: false // 設定許可画面を表示するかどうか
  }

  constructor(props) {
    super(props)

    this.auth = React.createRef()
  }

  initColumn = () => {
    this.columns = [
      {
        title: 'ロール名',
        dataIndex: 'name'
      },
      {
        title: '作成時間',
        dataIndex: 'create_time',
        render: create_time => formateDate(create_time)
      },
      {
        title: '認証時間',
        dataIndex: 'auth_time',
        render: formateDate
      },
      {
        title: '認証人',
        dataIndex: 'auth_name'
      }
    ]
  }

  getRoles = async () => {
    const result = await reqRoles()
    if (result.status === 0) {
      const roles = result.data
      this.setState({
        roles
      })
    }
  }

  onRow = role => {
    return {
      onClick: event => {
        // クリックライン
        console.log('row onClick()', role)
        // alert('クリックライン')
        this.setState({
          role
        })
      }
    }
  }

  /*
 　ロールを追加
   */
  addRole = () => {
    // フォーム検証を実行し、合格した場合にのみ処理します
    this.form.validateFields(async (error, values) => {
      if (!error) {
        // 確認ボックスを非表示
        this.setState({
          isShowAdd: false
        })

        // 入力データを収集する
        const { roleName } = values
        this.form.resetFields()

        // 追加のリクエスト
        const result = await reqAddRole(roleName)
        // 結果に基づくプロンプト/更新リストの表示
        if (result.status === 0) {
          message.success('添加角色成功')
          // this.getRoles()
          //新しいロール
          const role = result.data
          // 更新roles状態
          /*const roles = this.state.roles
          roles.push(role)
          this.setState({
            roles
          })*/
          console.log(role)
          // 更新roles状態: 元のステータスデータに基づいて更新
          console.log([this.state.roles, role])
          this.setState(state => ({
            roles: [...state.roles, role]
          }))
        } else {
          message.success('ロールを追加できません')
        }
      }
    })
  }

  /*
  更新ロール
   */
  updateRole = async () => {
    // 確認ボックスを非表示
    this.setState({
      isShowAuth: false
    })

    const role = this.state.role

    // 最新menusを取得
    const menus = this.auth.current.getMenus()
    role.menus = menus
    role.auth_time = Date.now()
    role.auth_name = this.props.user.username

    // リクエストロールを更新
    const result = await reqUpdateRole(role)
    if (result.status === 0) {
      message.success('ロール権限を更新した')
      this.setState({
        roles: [...this.state.roles]
      })
    }
  }

  componentWillMount() {
    this.initColumn()
  }

  componentDidMount() {
    this.getRoles()
  }

  render() {
    const { roles, role, isShowAdd, isShowAuth } = this.state

    const title = (
      <span>
        <Button
          type="primary"
          onClick={() => this.setState({ isShowAdd: true })}
        >
          ロールを作成
        </Button>{' '}
        &nbsp;&nbsp;
        <Button
          type="primary"
          disabled={!role._id}
          onClick={() => this.setState({ isShowAuth: true })}
        >
         ロール権限を更新
        </Button>
      </span>
    )

    return (
      <Card title={title}>
        <Table
          bordered
          rowKey="_id"
          dataSource={roles}
          columns={this.columns}
          pagination={{ defaultPageSize: PAGE_SIZE }}
          rowSelection={{
            type: 'radio',
            selectedRowKeys: [role._id],
            onSelect: role => {
              // ラジオが選択されたときのコールバック
              this.setState({
                role
              })
            }
          }}
          onRow={this.onRow}
        />

        <Modal
          title="ロールを追加"
          visible={isShowAdd}
          onOk={this.addRole}
          onCancel={() => {
            this.setState({ isShowAdd: false })
            this.form.resetFields()
          }}
        >
          <AddForm setForm={form => (this.form = form)} />
        </Modal>

        <Modal
          title="ロールの権限を設定する"
          visible={isShowAuth}
          onOk={this.updateRole}
          onCancel={() => {
            this.setState({ isShowAuth: false })
          }}
        >
          <AuthForm ref={this.auth} role={role} />
        </Modal>
      </Card>
    )
  }
}
export default connect(
  state => ({user: state.user})
)(Role)