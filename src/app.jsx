/*
 * @Author: shijie
 * @Date:   2019-01-29 12:28:46
 * @Last Modified by:   shijie
 * @Last Modified time: 2019-01-29 13:13:24
 */
import React from 'react';
import ReactDOM from 'react-dom';
import LuckyUtil from 'util/lucky.jsx';

const _lucky=new LuckyUtil();
import {HashRouter,BrowserRouter,Route,Link,Switch,Redirect } from 'react-router-dom';
//通用组件
import Layout from 'component/layout/index.jsx';
//页面
import Home from 'page/home/index.jsx';
//登录组件
import Login from 'page/login/index.jsx';
//错误页面
import ErrorPage from 'page/error/index.jsx';
//商品
import ProductRouter from 'page/product/router.jsx';
//订单页
// import OrderList from 'page/order/index.jsx';
//订单详情页
// import OrderDetail from 'page/order/detail.jsx';
//用户列表页
import UserList from 'page/user/index.jsx';

class App extends React.Component{
	constructor(props){
		super(props)
	}
	
	render(){
        let LayoutRouter = (
            <Layout> 
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/product" component={ProductRouter}/>
                    <Route path="/product-category" component={ProductRouter}/>
                    <Route path="/user/index" component={UserList}/>
                    <Redirect exact from="/user" to="/user/index"/>
                    <Route component={ErrorPage}/>
                </Switch>
            </Layout>
        );
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/" render={ props => LayoutRouter}/>
                </Switch>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(
	<App/>,
	document.getElementById('app')
);

