import React from 'react';


//订单搜索
class ListSearch extends React.Component{
	constructor(props){
		super(props);
		this.state={
			orderNumber : ''
		}
	}
	//数据变化的时候
	onValueChange(e){
		let name = e.target.name;
		let value = e.target.value.trim();
		this.setState({
			[name] : value
		})
	}
	//输入关键字后按回车，自动提交
	onSearchKeywordKeyUp(e){
		if(e.keyCode === 13){
			this.onSearch();
		}
	}
	//点击搜索按钮的时候
	onSearch(){
		this.props.onSearch(this.state.orderNumber);

	}
	render(){
		return (
			<div className="row search-wrap">
				<div className="col-md-12">
					<div className="form-inline">
						<div className="form-group">
							<select className="form-control">
								<option>按订单号查询</option>
							</select>
						</div>
						<div className="form-group">
							<input type="text" 
								className="form-control"
								placeholder="订单号"
								name="orderNumber"
								onKeyUp={this.onSearchKeywordKeyUp.bind(this)}
								onChange={this.onValueChange.bind(this)} />
						</div>
						<button className="btn btn-primary"
							onClick={this.onSearch.bind(this)} >搜索</button>
					</div>
				</div>
			</div>
		)
		
	}
}




export default ListSearch;