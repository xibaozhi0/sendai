import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Select} from 'antd'
const Item = Form.Item
const Option = Select.Option


/*
ユーザーのフォームコンポーネントを追加/変更する
 */
class UserForm extends PureComponent {

  static propTypes = {
    setForm: PropTypes.func.isRequired, // フォームオブジェクトを渡すために使用される関数
    roles: PropTypes.array.isRequired,
    user: PropTypes.object
  }

  componentWillMount () {
    // setForm（）を介してフォームオブジェクトを親コンポーネントに渡します
   //このようにして、親コンポーネントはフォームのカプセル化メソッドを使用してフォームの値を取得できます
    this.props.setForm(this.props.form)
  }
  
    //  パスワード検証をカスタマイズする
    // ユーザー名/パスワードの合法性要件
    //  1）。入力する必要があります   
    //  2）。4桁以上である必要があります
    //  3）。12桁以下でなければなりません
    //  4）。英語、数字、またはアンダースコアで構成する必要があります    

    validatePwd=(rule,value,callback)=>{
      console.log(value,rule)
      const pwdLen=value && value.length 
      const pwdReg=/^[a-zA-Z0-9_]+$/
      if (!value) {
        callback('password is necessary')
      }else if (pwdLen<6) {
        callback('password should more than 6 digital')
      } else if(pwdLen>16) {
        callback('password must be no more than 16 digital')
      }else if(!pwdLen.test(value)) {
        callback('password must be english character,array or underscore')
      }else{
        callback()
      }

    }
                                         
  render() {

    const {roles, user} = this.props
    const { getFieldDecorator } = this.props.form
    //アイテムのレイアウトを指定する構成オブジェクト
    const formItemLayout = {
      labelCol: { span: 6 },  // 左ラベルの幅
      wrapperCol: { span: 15 }, // 適切なパッケージの幅
    }


    return (
      <Form {...formItemLayout}>
        <Item label='ユーザー名'>
          {
            getFieldDecorator('username', {
              initialValue: user.username,
              rules: [
                { required: true, message: 'username is necessary!' },
                { min: 6, message: 'user name should be less than 6 digital' },
                { max: 12, message: 'user name should be more than 12 digital' },
                { pattern: /^[a-zA-Z0-9_]+$/, message: 'username must be english character,array or underscore' }
            ],
            })(
              <Input placeholder='ユーザー名を入れてください'/>
            )
          }
        </Item>

        {
          user._id ? null : (
            <Item label='暗証番号'>
              {
                getFieldDecorator('password', {
                  initialValue: user.password,
                })(
                  <Input type='password' placeholder='暗証番号をいれてください'/>
                )
              }
            </Item>
          )
        }

        <Item label='携帯電話番号'>
          {
            getFieldDecorator('phone', {
              initialValue: user.phone,
              rules: [{required:true,message:'please input you cell phone number'},
              {len:11,message:'telephone number should be 11 digital'},
              {pattern:/^0[123456789]\d{9}$/, message: 'the telephone number did not match'}],
            })(
              <Input placeholder='携帯電話番号を入れてください'/>
            )
          }
        </Item>
        <Item label='メール'>
          {
            getFieldDecorator('email', {
              initialValue: user.email,
              rules:[
                {required:true,message:'please input your email'},
                {pattern:/^['A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-X-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,message:'please input correct formate'}
              ],
            })(
              <Input placeholder='メールアドレスをいれてください'/>,
            )
          }
        </Item>

        <Item label='役割'>
          {
            getFieldDecorator('role_id', {
              initialValue: user.role_id,
            })(
              <Select>
                {
                  roles.map(role => <Option key={role._id} value={role._id}>{role.name}</Option>)
                }
              </Select>
            )
          }
        </Item>
      </Form>
    )
  }
}

export default Form.create()(UserForm)