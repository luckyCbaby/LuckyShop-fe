import React from 'react';


class PageTitle extends React.Component{
	constructor(props){
		super(props);
	}
	//使用生命周期。在加载组件的时候把标题替换
	componentWillMount(){
		document.title=this.props.title + '-LuckyShop';
	}
	render(){
		return(
			<div className="row">
					<div className="col-md-12">
						<h1 className="page-header">{this.props.title}</h1>
						{this.props.children}
					</div>
				</div>
			
		)
	}
};



export default PageTitle;