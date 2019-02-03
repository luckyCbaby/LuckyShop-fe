/*
 * @Author: shijie
 * @Date:   2019-01-29 12:28:46
 * @Last Modified by:   shijie
 * @Last Modified time: 2019-01-29 13:13:24
 */
import React from 'react';
import ReactDOM from 'react-dom';

import {HashRouter,BrowserRouter,Route,Link,Switch,Redirect } from 'react-router-dom';
//页面
import Home from 'page/home/index.jsx';
//通用组件
import Layout from 'component/layout/index.jsx';

class App extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return(
			<BrowserRouter>
				<Layout>
					<Switch>
						<Route exact path="/" component={Home} />
						 {/* 如果匹配不到path 就把所有链接都跳转到/ */}
						<Redirect from="*" to="/" />
					</Switch>
				</Layout>
				
			</BrowserRouter>
		);
	}
}

ReactDOM.render(
	<App/>,
	document.getElementById('app')
);

