import React, { Component } from 'react'
import {Form, Icon, Input, Button, notification, message, Checkbox  } from 'antd'
import { Redirect,Link } from 'react-router-dom'
import './login.less'
import {connect} from 'react-redux'
import logo from './images/logo.png'
import {login, clearLogout} from '../../redux/actions'


const Item = Form.Item 
/**
 * ログイン　コンポーネント
 */
class Login extends Component {
  async handleSubmit(event) {
    event.preventDefault()
    // すべてのフォームフィールドを検証する
    this.props.form.validateFields(async (err, values) => {
      // 検証が成功の場合
      if (!err) {
        // console.log('Ajaxリクエストを送信する', values)
        // ログインリクエストを
        const { username, password } = values
        // 非同期アクションをディスパッチする関数を呼び出す=>ログインの非同期リクエストを送信し、結果の後にステータスを更新する
        this.props.login(username, password)
      } else {
        console.log('検証失敗!')
      }
    })
  }
  render() {
      if (this.props.user && this.props.user.logout) {
        notification.success({
          message: '正常に終了',
          duration: 2
        })
        this.props.clearLogout('logout')
      }
      if (this.props.user && this.props.user.errorMsg) {
        message.error(this.props.user.errorMsg)
        this.props.clearLogout('errorMsg')
      }
      if (this.props.user && this.props.user._id) {
        //ユーザーがログインしていると判断する
        notification.success({
          message: 'ログイン成功',
          duration: 2
        })
        return <Redirect to="/" />
      }
      const { getFieldDecorator } = this.props.form
      return (
    
        <div   className="login">
        <Link to="/">
       <header className="header">
       <img
      src={logo}
       alt="logo"
     />
       <h1>Pear</h1>
  {/* <h1>    <span className="register"> <a href="/register">register now!</a></span> </h1> */}
       </header>
       </Link>
       <section className="login-content">
         <span> <a href="/register">register now!</a></span> 
            
            <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
              <Item>
                {/*
              ユーザー名/パスワードの合法性要件
              1）.入力する必要があります
              2）.4以上でなければなりません
              3）.<div className=""></div>12以下でなければなりません
              4）.英語、数字、またはアンダースコアでなければなりません
               */}
                {getFieldDecorator('username', {
                  rules: [
                    { required: true, message: 'Please input your username!' }
                  ],initialValue:'admin'
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    placeholder="ユーザー名"
                  />
                )}
              </Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [
                    { required: true, message: 'Please input your password!' }
                  ],initialValue:'admin'
                })(
                  <Input
                    prefix={
                      <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    type="password"
                    placeholder="暗証番号"
                  />
                )}
              </Form.Item>
              <span>
            <Form.Item>
             <Form.Item name="remember" valuePropName="checked" noStyle>
               <Checkbox>Remember me</Checkbox>
             </Form.Item>
             <a className="login-form-forgot" href="">
               Forgot password
             </a>
           </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button">
                  ログイン
                </Button>
              </Form.Item>
              <h2>login with other</h2>
              <span>   <Form.Item>
              　   <Button
                  type="primary"
                  htmlType="submit"
                  className="google-form-button">
                  <Icon type="google" />
                </Button>      
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="github-form-button">
                  <Icon type="github" />
                </Button>        　　
              </Form.Item>
           <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="signInTwitter-form-button">
                <Icon type="twitter" />
                </Button>        　　
              </Form.Item></span>
             
              </span>
              <Form.Item>
       
              </Form.Item>
            </Form>
          </section>
        </div>
      )
    }
  }
  const WrapLogin = Form.create()(Login)
  export default connect(
    state => ({user: state.user}),
    {login, clearLogout}
  )(WrapLogin)