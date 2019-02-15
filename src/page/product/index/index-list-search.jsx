import React from 'react';



class ListSearch extends React.Component{
	constructor(props){
		super(props);
		this.state={
			searchType : 'productId',
			searchKeyword : ''
		}
	}
	//输入关键字后回车自动提交
	onSearchKeywordKeyUp(e){
		if(e.keyCode ===13){
			this.onSearch();
		}
	}
	//数据发生变化的时候
	onValueChange(e){
		let name = e.target.name;
		let value = e.target.value;
		this.setState({
			[name] : value
		})
	}
	//点击搜索按钮的时候
	onSearch(){
		//index.jsx这个父组件中传进来的
		this.props.onSearch(this.state.searchType,this.state.searchKeyword);
	}

	render(){
		return(
			<div className="row search-wrap">
				<div className="col-md-12">
					<div className="form-inline">
						<div className="form-group">
							<select name="searchType" 
								className="form-control"
								onChange={this.onValueChange.bind(this)} >
								<option value="productId">按商品ID查询</option>
								<option value="productName">按商品名称查询</option>
							</select>
						</div>
						<div className="form-group">
							<input type="text" 
								className="form-group"
								placeholder="关键词"
								name="searchKeyword"
								onKeyUp={this.onSearchKeywordKeyUp.bind(this)}
								onChange={this.onValueChange.bind(this)} />
						</div>
						<button className="btn btn-primary" onClick={this.onSearch.bind(this)}>搜索</button>
					</div>
				</div>
			</div>
		)
	}
}



export default ListSearch;