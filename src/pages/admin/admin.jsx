 import React, { Component } from 'react'
 import { Redirect, Switch, Route} from 'react-router-dom'
 import {Layout} from 'antd'
 import LeftNav from '../../components/left-nav'
 import Header from '../../components/header'
 import Dashboard from '../dashboard/dashboard'
 import Category from '../category/category'
 import Product from '../product/product'
 import Role from '../role/role'
 import User from '../user/user'
 import Bar from '../charts/bar'
 import Line from '../charts/line'
 import Pie from '../charts/pie'
 import Order from '../order/order'
 import {connect} from 'react-redux'
 import NotFound from '../not-found/not-found'
 import Promotion from '../promotion/promotion'
 import Service from '../service/service'
 import Recommendation from '../recommendation/recommendation'
 import Stock from '../stock/stock'
 // import Research from '../research/research'
 import Shipping from '../register/register'
 import Payment from '../payment/payment'
 import Home from '../home/home'
 import Comment from '../comment/comment'
 
 
 
 
 const {Footer, Sider, Content } = Layout;
 class Admin extends Component {
   render() {
     if (!this.props.user || !this.props.user._id) {
       //ユーザーが登録するかどうか、判断する
       return <Redirect to="/login" />
     }
 
     return (
       <Layout style={{height:'100%'}}>
       <Sider style={{borderRight:"1px solid #e8e8e8"}} theme="light"><LeftNav></LeftNav></Sider>
       <Layout>
         <Header>Header</Header>
         <Content style={{marginTop: "30px",
           backgroundColor: "white"}}>
           <Switch>
           <Redirect exact from='/' to='/dashboard'/>
           <Route path='/dashboard' component={Dashboard}/>
           <Route path='/category' component={Category}/>
           <Route path='/product' component={Product}/>
           <Route path='/role' component={Role}/>
           <Route path='/user' component={User}/>
           <Route path='/charts/bar' component={Bar}/>
           <Route path='/charts/line' component={Line}/>
           <Route path='/charts/pie' component={Pie}/>
           <Route path="/order" component={Order}/>
           <Route path='/service' component={Service}/>
           <Route path='/recommendation' component={Recommendation}/>
           <Route path='/stock' component={Stock}/>
           <Route path='/comment' component={Comment}/>
           <Route path='/shipping' component={Shipping}/>
           <Route path='/payment' component={Payment}/>
           <Route path='/admin' component={Admin}/> 
           <Route path='/promotion' component={Promotion}/>
           <Route path='/' component={Home}/>
           <Route component={NotFound}/> {/*もし上記のどれも直接一致しないと、表示する*/}
         </Switch>
         </Content>
         <Footer style={{textAlign: "center",
         backgroundColor: "white", padding:"14px 25px",borderTop:"1px solid #e8e8e8"}}>https://www.aspark.co.jp/</Footer>
       </Layout>
     </Layout>
     )
   }
 }
 export default connect(
   state => ({user: state.user}),
 )(Admin)