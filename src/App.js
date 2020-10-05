import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Login from './pages/login/login'
import Register from './pages/register/register'
import Home from './pages/home/home'
import Admin from './pages/admin/admin'
/**
 * root application
 */

 const App =()=> {
  
    return (
      <BrowserRouter>
      <Switch> {/* 1つのルートのみに一致 switch */}
        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="/" component={Admin}></Route>
        <Route path='/home' component={Home}/>
       
        
      </Switch>
    </BrowserRouter>
    )
 
}
export default App