import React from 'react';
import {Link} from 'react-router-dom';
import LuckyUtil from 'util/lucky.jsx';
import Product from 'service/product-service.jsx';

import PageTitle from 'component/page-title/index.jsx';
import ListSearch from './index-list-search.jsx';
import TableList from 'util/table-list/index.jsx';
import Pagination from 'util/pagination/index.jsx';



const _lucky = new LuckyUtil();
const _product = new Product();

import './index.scss';

class ProductList extends React.Component{
	constructor(props){
		super(props);
		this.state={
			pageNum : 1,
			list:[],
			listType:'list'
		}
	}
	//组件加载完成请求列表（发送请求）
	componentDidMount(){
		this.loadProductList();
	}
	//加载商品列表
	loadProductList(){
		let listParam={};
		listParam.listType=this.state.listType;
		listParam.pageNum=this.state.pageNum;
		//如果是搜索的话，需要传入搜索类型和搜素的关键字
		if(this.state.listType === 'search'){
			listParam.searchType=this.state.searchType;
			listParam.keyword=this.state.searchKeyword;
		}
		//请求接口
		_product.getProductList(listParam).then(
			//请求成功
			(res) => {
				this.setState(res);
			},
			//请求失败
			(errMsg) => {
				//失败不显示任何商品
				this.setState({
					list : []
				})
				_lucky.errTips(errMsg);
			}
		)
	}
	//搜索
	onSearch(searchType,searchKeyword){
		//如果输入的关键字为空listType = list 不为空 listType=search
		let listType = searchKeyword === '' ? 'list' : 'search';
		//搜索改变state后重新请求数据
		this.setState({
			listType : listType,
			pageNum : 1,
			searchType : searchType,
			searchKeyword : searchKeyword
		},() => {
			this.loadProductList();
		})
	}
	//页数发生改变的时候,改变state，重新发送请求
	onPageNumChange(pageNum){
		this.setState({
			pageNum : pageNum
		},() => {
			this.loadProductList()
		})
	}
	//改变商品状态 上架 下架
	onSetProductStatus(e,productId,currentStatus){
		let newStatus = currentStatus == 1 ? 2 : 1;
		let confirmTips = currentStatus == 1 ? '确定要下架该商品？' : '确定要上架该商品？';
		if(window.confirm(confirmTips)){
			//修改商品状态
			_product.setProductStatus({
				productId : productId,
				status : newStatus
			}).then(
				//修改成功
				(res) => {
					_lucky.successTips(res);
					this.loadProductList();
				},
				//修改失败
				(errMsg) => {
					_lucky.errTips(errMsg);
				}
			)
		}
	}
	render(){
		let tableHeads=[
			{name:'商品ID',width:'10%'},
			{name:'商品信息',width:'50%'},
			{name:'价格',width:'10%'},
			{name:'状态',width:'15%'},
			{name:'操作',width:'15%'}
		];
		return(
			<div id="page-wrapper">
				<PageTitle title="商品列表">
					<div className="page-header-right">
						<Link to="/product/save" className="btn btn-primary">
							<i className="fa fa-plus"></i>
							<span>添加商品</span>
						</Link>
					</div>
				</PageTitle>
				<ListSearch onSearch={(searchType, searchKeyword) => {this.onSearch(searchType, searchKeyword)}}/>
				<TableList tableHeads={tableHeads}>
					{
						this.state.list.map((product,index) => {
							return(
								<tr key={index}>
									<td>{product.id}</td>
									<td>
										<p>{product.name}</p>
										<p>{product.subtitle}</p>
									</td>
									<td>¥{product.price}</td>
									<td>
										<p>{product.status === 1 ? '在售' : '已下架'}</p>
										<btton className="btn btn-xs btn-warning"
										onClick={(e) => {this.onSetProductStatus(e,product.id,product.status)}} >{product.status === 1 ? '下架' : '上架'}</btton>
									</td>
								    <td>
										<Link className="opear" to={`/product/detail/${product.id}`}>详情</Link>
										<Link className="opear" to={`/product/save/${product.id}`}>编辑</Link>
								    </td>
								</tr>
							)
						})
					}
				</TableList>
				<Pagination current={this.state.pageNum}
					total={this.state.total}
					onChange={this.onPageNumChange.bind(this)} />
			</div>
		)
	}
}




export default ProductList;
