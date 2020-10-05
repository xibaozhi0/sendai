import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Input,
  Tree
} from 'antd'
import menuList from '../../config/menuConfig'

const Item = Form.Item

const { TreeNode } = Tree;

/*
分類されたフォームコンポーネントを追加する
 */
export default class AuthForm extends PureComponent {

  static propTypes = {
    role: PropTypes.object
  }

  constructor (props) {
    super(props)

    // 入ってくるキャラクターのメニューに基づいて初期状態を生成する
    const {menus} = this.props.role
    this.state = {
      checkedKeys: menus
    }
  }

  /*
  親コンポーネントの最新のメニューデータを送信する方法
   */
  getMenus = () => this.state.checkedKeys


  getTreeNodes = (menuList) => {
    return menuList.reduce((pre, item) => {
      pre.push(
        <TreeNode title={item.title} key={item.key}>
          {item.children ? this.getTreeNodes(item.children) : null}
        </TreeNode>
      )
      return pre
    }, [])
  }

  // ノードが選択されたときのコールバック
  onCheck = checkedKeys => {
    console.log('onCheck', checkedKeys);
    this.setState({ checkedKeys });
  };


  componentWillMount () {
    this.treeNodes = this.getTreeNodes(menuList)
  }

  // 新しく渡されたロールに従って、checkedKeysの状態を更新します

  /**
   *    コンポーネントが新しいプロパティを受け取ったときに自動的に呼び出されます
   */

   
  componentWillReceiveProps (nextProps) {
    console.log('componentWillReceiveProps()', nextProps)
    const menus = nextProps.role.menus
    this.setState({
      checkedKeys: menus
    })
    // this.state.checkedKeys = menus
  }

  render() {
    console.log('AuthForm render()')
    const {role} = this.props
    const {checkedKeys} = this.state
    // アイテムレイアウトの設定オブジェクトを指定します
    const formItemLayout = {
      labelCol: { span: 4 },  // 左ラベルの幅
      wrapperCol: { span: 15 }, // 右のパッケージの幅
    }

    return (
      <div>
        <Item label='ロール名' {...formItemLayout}>
          <Input value={role.name} disabled/>
        </Item>

        <Tree
          checkable
          defaultExpandAll={true}
          checkedKeys={checkedKeys}
          onCheck={this.onCheck}
        >
          <TreeNode title="権限" key="all">
            {this.treeNodes}
          </TreeNode>
        </Tree>
      </div>
    )
  }
}