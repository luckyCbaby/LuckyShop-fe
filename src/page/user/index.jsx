import React from 'react';
import PageTitle from 'component/page-title/index.jsx';
import Pagination from 'util/pagination/index.jsx';
import User from 'service/user-service.jsx';
import LuckyUtil from 'util/lucky.jsx';

const _user = new User();
const _lucky = new LuckyUtil();


class UserList extends React.Component{
	constructor(props){
		super(props);
		this.state={
			pageNum : 1,
			list:[],
			total:0,
			page:1,
			firstLoading : true
		}
	}
	componentDidMount(){
		this.loadeUserList();
	}
	loadeUserList(){
		_user.getUserList(this.state.pageNum).then((res) => {
			this.setState(Object.assign({},{page:this.state.pageNum},res));
		},(errMsg) => {
			this.setState({
				list : []
			})
			 _lucky.errTips(errMsg);
		});
	}
	//当页数变化的时候 
	onPageNumChange(pageNum){
		this.setState({
			pageNum : pageNum
		},() => {
			this.loadeUserList();
		})
	}
	render(){
		let listBody = this.state.list.map((user,index) => {
			return(
				<tr key={index  }>
					<td>{user.id}</td>
					<td>{user.username}</td>
					<td>{user.email}</td>
					<td>{user.phone}</td>
					<td>{new Date(user.createTime).toLocaleString()}</td>
				</tr>
			)
		});

		let listError = (
			<tr>
				<td colSpan="5" className="text-center">没有找到相应的结果</td>
			</tr>
		);

		let tableBody =  this.state.list.length > 0 ? listBody : listError;										

		return(
			<div id="page-wrapper">
				<PageTitle title="用户列表" />
				<div className="row">
					<div className="col-md-12">
						<table className="table table-striped table-bordered">
							<thead>
								<tr>
									<th>ID</th>
									<th>用户名</th>
									<th>邮箱 </th>
									<th>电话</th>
									<th>注册时间</th>
								</tr>
							</thead>
							<tbody>
								{tableBody }
							</tbody>
						</table>
					</div>
				</div>
				<Pagination current={this.state.page} 
							total={this.state.total} 
							 onChange={this.onPageNumChange.bind(this)} />
			</div>
			
		)
	}
}




export default UserList;