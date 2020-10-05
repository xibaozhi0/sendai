
// import './home.less'
// import React, { useState } from 'react';
// import logo from './images/logo512.png'
//  import './App.css';
// import { Layout, Space, Avatar, Menu, Input, Button, Row, Col, Divider ,Tooltip,Badge,Typography,Breadcrumb } from 'antd';
// import Title from 'antd/lib/typography/Title';
// import SubMenu from 'antd/lib/menu/SubMenu';
// import {Route,Link, Switch} from 'react-router-dom';


// import Login from '../user/login/Login';
// import Signup from '../user/signup/Signup';
// import Profile from '../user/profile/Profile';
// import OAuth2RedirectHandler from '../user/oauth2/OAuth2RedirectHandler';
// import NotFound from '../common/NotFound';
// import LoadingIndicator from '../common/LoadingIndicator';
// import { getCurrentUser } from '../util/APIUtils';
// import { ACCESS_TOKEN } from '../constants';
// import PrivateRoute from '../common/PrivateRoute';
// import Alert from 'react-s-alert';
// import 'react-s-alert/dist/s-alert-default.css';
// import 'react-s-alert/dist/s-alert-css-effects/slide.css';
// import './App.css';

// import {
//   PieChartOutlined,
//   // MailOutlined,
//   ShoppingCartOutlined,
//   WindowsOutlined, 
//   MoneyCollectOutlined,
//   SearchOutlined,
//   UserOutlined} from '@ant-design/icons'

// const { Header, Footer, Sider, Content } = Layout;

// /*
// Home route component
//  */
// const Home = (props) =>{
//   const { Search } = Input;
//   const { Title } = Typography;
//   const [selectedProduct,setSelectedProduct]=useState('')
//   const [visible,setVisible]=useState(false);
//   // const style = { background: 'ffff000', FontColors:'red'};
//   const ViewProductButton=({productName})=>{
//     // return <Button type='dashed' style={{float:'right'}} onClick={()=>onSelect(productName)}>view product detail</Button>
//   }
//   // onSelect=productName=>{
//   //   selectedProduct(productName)
//   //   setVisible(true)
//   // }
//   return (
//     <div className="App">
//    <Layout className="layout">
//       <Header>  
//          <Row>
//              <Col span={1}>      
//              <Link to="/" className="app-title"> 
//               <img style={{ float: 'right',height:60 ,margin:4}} src={logo} alt="logo" ></img>
//               </Link>
//                </Col>
//                <Col span={1}>       
//                <Title level={4}style={{ float: 'left',height:55,color:'white' ,margin:15}}>aspark</Title>
//                </Col>
//                <Col span={11}>       
              
//                </Col>
//              <Col style={{ float: 'right',height:55 ,margin:4,color:'white'}}span={3}>
//              <Input placeholder="search" />
//                </Col>
//                <Col style={{ float: 'right',height:55 ,margin:4,color:'white'}} span={1}>
//                <Tooltip title="search">
//                 <Button type="default" shape="circle" icon={<SearchOutlined />} />
//               </Tooltip>
//               </Col>
//              <Col span={1} style={{ float: 'right',height:55 ,margin:4,color:'white'}}>
//              <span className="avatar-item">
//              <Badge count={1}>
//              <Button type="default" shape="circle" icon={<ShoppingCartOutlined />} />
            
//              </Badge>
//              </span>
//                </Col>
//                <Col style={{ float: 'left',height:55 ,margin:4,color:'white'}} span={1}>
//                <span className="avatar-item">
//              <Badge count={1}>
//              <Button type="default" shape="circle" icon={<MoneyCollectOutlined />} />
//              </Badge>
//              </span>
//               </Col>
//              <Col style={{ float: 'right',height:55,color:'white'}} span={3}>
//              <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
//                 <Menu.Item key="Login">Login</Menu.Item>
//                 <Menu.Item key="Register">Register</Menu.Item>
//                 {/* <Menu.Item key="3">nav 3</Menu.Item> */}
//               </Menu>
//               </Col>
              
//               <Col style={{ float: 'right',height:55 ,margin:4,color:'white'}} span={1}>
//               <Badge count={1}>
//               <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
//               </Badge>
//               </Col>
             
//         </Row>
//         <div className="app-top-box">
//           {/* <AppHeader authenticated={this.state.authenticated} onLogout={this.handleLogout} /> */}
//         </div>
//         <div className="app-body">
//           <Switch>
            
//             <PrivateRoute path="/profile" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
//               component={Profile}></PrivateRoute>
//             <Route path="/login"
//               render={(props) => <Login authenticated={this.state.authenticated} {...props} />}></Route>
//             <Route path="/signup"
//               render={(props) => <Signup authenticated={this.state.authenticated} {...props} />}></Route>
//             <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}></Route>  
//             <Route component={NotFound}></Route>
//             <Route exact path="/" component={Home}></Route>   
//           </Switch>
//         </div>
//      </Header> 
//      <Layout>
//      <Sider>
 
//            <Menu
//              defaultSelectedKeys={['category']}
//              mode="inline"
//            >
//              <Menu.Item key='Category'>
//              <WindowsOutlined />  Product list
//            </Menu.Item>
          
//                  <SubMenu
//                    title={
//                      <span>
//                       product
//                      </span>
//                    }>
//                    <Menu.ItemGroup key='Product' title='Product'>
//                      <Menu.Item key='osaka'> osaka branch</Menu.Item>
//                      <Menu.Item key='sentai'> sentai branch</Menu.Item>
//                    </Menu.ItemGroup>
//                  </SubMenu>
                 
//            </Menu>
//            <Menu
 
//      defaultSelectedKeys={['category']}
//      mode="inline"
//     >
//      <Menu.Item key='Category'>
//      <WindowsOutlined />  Product list
//     </Menu.Item>

//      <SubMenu
//        title={
//          <span>
//           product
//          </span>
//        }>
//        <Menu.ItemGroup key='Product' title='Product'>
//          <Menu.Item key='osaka'> osaka branch</Menu.Item>
//          <Menu.Item key='sentai'> sentai branch</Menu.Item>
//        </Menu.ItemGroup>
//      </SubMenu>
     
//    </Menu>
   
//     <Menu
//       defaultSelectedKeys={['Home']}
//       mode="inline"
//     >
//       <Menu.Item key='Home'>
//       Contact
//     </Menu.Item>
//        <SubMenu
//          title={
//            <span>
//              {/* <MailOutlined /> */}
//              <span>About US</span>
//            </span>
//          }>
//          <Menu.ItemGroup key='AboutUS' title='Head Office'>
//            <Menu.Item key='osaka'> osaka branch</Menu.Item>
//            <Menu.Item key='sentai'> sentai branch</Menu.Item>
//          </Menu.ItemGroup>
//        </SubMenu>
       
//     </Menu>
//    </Sider>
  
//         <Layout>
//             <Content style={{ padding: '0 50px' }}>
//             <Breadcrumb style={{ margin: '16px 0' }}>
//                 <Breadcrumb.Item>Home</Breadcrumb.Item>
//             </Breadcrumb>
//             <div style={{ background: '#fff', padding: 24, minHeight: 580 }}>
//             {/* <ProductDetail productName='Virat Kohli' categary='IND' avatarSrc='./vk.jpg'>
//               productDetail 
//             </ProductDetail> */}
//                </div>
//             </Content>
//             <div style={{ background: '#fff', padding: 24, minHeight: 580 }}>
//             </div> 
//             <Footer style={{ textAlign: 'center' }}>aspark</Footer> 
//         </Layout>
//      </Layout>
//   </Layout>
//          <div>
       
//          </div>
      
//     </div>
//   );
// }


import React from 'react';

const Home =() => (
    <div>
    home,el welcome to your home, this is your first time to use function as a router
    </div>
  );


export default Home

