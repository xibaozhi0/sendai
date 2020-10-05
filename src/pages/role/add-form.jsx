import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Input
} from 'antd'

const Item = Form.Item

/*
分類されたフォームコンポーネントを追加する
 */
class AddForm extends Component {

  static propTypes = {
    setForm: PropTypes.func.isRequired, // フォームオブジェクトを渡すために使用される関数
  }

  componentWillMount () {
    this.props.setForm(this.props.form)
  }

  render() {
    const { getFieldDecorator } = this.props.form
    // アイテムレイアウトの設定オブジェクトを指定します
    const formItemLayout = {
      labelCol: { span: 4 },  // 左ラベルの幅
      wrapperCol: { span: 15 }, // 右のパッケージの幅
    }

    return (
      <Form>
        <Item label='ロール名' {...formItemLayout}>
          {
            getFieldDecorator('roleName', {
              initialValue: '',
              rules: [
                {required: true, message: 'ロール名を入力してください'}
              ]
            })(
              <Input placeholder='ロール名を入力してください'/>
            )
          }
        </Item>
      </Form>
    )
  }
}

export default Form.create()(AddForm)