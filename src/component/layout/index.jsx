import React from 'react';
//主题样式
import './theme.css';
import TopNav from 'component/top-nav/index.jsx';
import SideNav from 'component/side-nav/index.jsx';
{/*该文件放一些通用组件 是个容器*/}
class Layout extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return(
			<div id="wrapper">
				<TopNav/>
				<SideNav/>
				{this.props.children}
			</div>
		)
	}
}


export default Layout;