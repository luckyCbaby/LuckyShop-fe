import LuckyUtil from 'util/lucky.jsx';

const _lucky = new LuckyUtil();


class User{
	//登录
	login(loginInfo){
		return _lucky.request({
			url:'/manage/user/login.do',
			type:"post",
			data:loginInfo
		})
	}

	//检查登录接口的数据是否合法
	checkLoginInfo(loginInfo){
		let username = loginInfo.username.trim();
		let password = loginInfo.password.trim();

		//判断用户名是否为空 或者 是否为字符串
		if(typeof username !== 'string' || username.length == 0){
			return {
				status : false,
				msg : '用户名不能为空！'
			}
		}
		//判断密码是否为空 
		if(typeof password !== 'string' || password.length == 0){
			return {
				status : false,
				msg : '密码不能为空！'
			}
		}
		//验证通过
		return {
			status : true,
			msg : '验证通过！'
		}
	}


	//退出登录
	logout(){
		return _lucky.request({
			url : '/user/logout.do',
			type : 'post'
		})
	}

	// 获取用户列表
	getUserList(pageNum){
		return _lucky.request({
			url:'/manage/user/list.do',
			type:'post',
			data:{
				pageNum : pageNum, 
			},
		})
	}
};


export default User;