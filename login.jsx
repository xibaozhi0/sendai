import React, { Component } from 'react'
import {Form, Icon, Input, Button, notification, message, Checkbox,Space,Divider,Row, Col } from 'antd'
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
   <Row>
      <Link to="/" > <Col span={3} > <img src={logo} alt="logo"/></Col> </Link>
          <Col span={3} className="login-header"><h2>Pear</h2></Col>
          <Col span={15}></Col> 
          <Col span={3} className="login-header" style={{ float: 'right'}}><Link to="/register" > 
           
             <header>register</header>
       </Link></Col>
     </Row>
    
       <section className="login-content">
        
            
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
              {/* </Form.Item>
           
            <Form.Item> */}
             <Form.Item name="remember" valuePropName="checked" noStyle>
               <Checkbox >Remember me</Checkbox>
           
             <Link to="/forgetPassword" className="login-form-forgot" style={{ float: 'right'}}>
               Forgot password
             </Link>
             </Form.Item>
           
           {/* </Form.Item>
              <Form.Item> */}
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button">
                  ログイン
                </Button>
                   <h1  style={{float: 'center' }}>login with other</h1>
            
               <Button type="primary" htmlType="submit"className="form-button">
                  <Icon type="twitter" />
              </Button>   
    <Divider type="vertical" orientation="left"dashed/>
               <Button
                  type="primary"
                  htmlType="submit"
                  className="orm-button">
                  <Icon type="google" />
              </Button>      
              <Divider type="vertical" orientation="right" dashed/>
              <Button
                  type="primary"
                  htmlType="submit"
                >
                  <Icon type="facebook" />
              </Button> 
              <Divider type="vertical" orientation="left"dashed/>
              <Button
                  type="primary"
                  htmlType="submit"
                >
                  <Icon type="linkedin" />
              </Button> 
              <Divider type="vertical" orientation="right" dashed/>
              <Button
                  type="primary"
                  htmlType="submit"
                >
                  <Icon type="github" />
              </Button> 
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
