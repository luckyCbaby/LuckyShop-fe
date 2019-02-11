import React from 'react';
import './index.css';
import LuckyUtil from 'util/lucky.jsx';
import User from 'service/user-service.jsx';

const _user = new User();
const _lucky=new LuckyUtil();

class Login extends React.Component{
	　constructor(props){
		super(props);
		this.state={
			username:'',
			password:' ',
			redirect : _lucky.getUrlParam('redirect') || '/', //取得登录时URL参数
		}
	}
	componentWillMount(){
		document.title='登录 - Luckyshop-fe'
	}
	//当用户名发生改变
	onInputChange(e){
		this.setState({
			[e.target.name]:e.target.value
		});
	}
	// 提交登录
	onSubmit(){
		let loginInfo ={
			username : this.state.username,
			password : this.state.password
		};
		let checkResult = _user.checkLoginInfo(loginInfo);

		//如果验证通过
		if(checkResult.status){
			_user.login(loginInfo).then((res) => {
				_lucky.setStorage('userInfo',res);
				this.props.history.push(this.state.redirect);
			},(errMsg) => {
				_lucky.errTips(errMsg);
			})
		}
		//验证不通过
		else{
			_lucky.errTips(checkResult.msg);
		}
	}
	render(){
		return(
				<div className="col-md-4 col-md-offset-4">
					<div className="panel panel-default login-panel">
						<div className="panel-heading">欢迎登录 - LuckyShop管理系统</div>
						<div className="panel-body">
							<div>
								<div className="form-group">
									<input type="text" 
										name="username"
										className="form-control" 
										placeholder="请输入用户名" 
										onChange={this.onInputChange.bind(this )} />
								</div>
								<div className="form-group">
									<input type="password" 
										name="password"
										className="form-control" 
										placeholder="请输入密码"
										onChange={this.onInputChange.bind(this)} />
								</div>
								<button className="btn btn-lg btn-block btn-primary" onClick={this.onSubmit.bind(this)} >登录</button>
							</div>
						</div>
					</div>
				</div>
		)
	}
};


export default Login;