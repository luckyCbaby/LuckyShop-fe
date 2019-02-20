import React from 'react';
import './index.scss';
import PageTitle from 'component/page-title/index.jsx';
import {Link} from 'react-router-dom';
import Statistic from 'service/statistic-service.jsx';
import LuckyUtil from 'util/lucky.jsx';
const Mock = require('mockjs');
const _satatistic = new Statistic();
const _lucky = new LuckyUtil();  



Mock.mock('/manage/statistic/base_count.do?',{
	status:0,
	data:{
		orderCount: 89,
		productCount: 34,
		userCount: 8
	}
});
class Home extends React.Component{
	constructor(props){
		super(props);
		this.state={
			userCount : '-',
			productCount : '-',
			orderCount : '- '
		}
	}
    componentDidMount(){
    	this.loadeCount();
    }
	loadeCount(){
		_satatistic.getHomeCount().then((res) => {
			this.setState(res);
		},(errMsg) => {
			_lucky.errTips(errMsg)
		})
	}
	render(){
		return(
			<div id="page-wrapper">
				<PageTitle title="首页" />
				<div className="row">
					<div className="col-md-4">
						<Link to="/user" className="color-box brown">
							<p className="count">{this.state.userCount}</p>
							<p className="desc">
								<i className="fa fa-user-o"></i>
								<span>用户总数</span>
							</p>
						</Link>
					</div>
					<div className="col-md-4">
						<Link to="/product" className="color-box green">
							<p className="count">{this.state.productCount}</p>
							<p className="desc">
								<i className="fa fa-list"></i>
								<span>商品总数</span>
							</p>
						</Link>
					</div>
					<div className="col-md-4">
						<Link to="/order" className="color-box blue">
							<p className="count">{this.state.orderCount}</p>
							<p className="desc">
								<i className="fa fa-check-square-o"></i>
								<span>订单总数</span>
							</p>
						</Link>
					</div>
				</div>
			</div>
		)
	}
}


export default Home;