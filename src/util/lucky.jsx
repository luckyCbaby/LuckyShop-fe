import Ajax from 'util/ajax.jsx';


const $ =new Ajax();


class LuckyUtil{
	request(param){
		const _this = this;
		return new Promise((resolve,reject) => {
			$.ajax({
				url:param.url,
				type:param.type,
				asyn:param.asyn,
				data:param.data,
				dataType:param.dataType,
				//数据请求成功
				success(res){//res. response

					if(res.status === 0){ //后端接口定义0为成功
						typeof resolve == 'function' ? resolve(res.data,res.msg) : console.log(new Error('resolve must be a function')); 
					}
					//没有登录状态，强制登录 
					else if(res.status == 10){ //未登录
						_this.doLogin();
					}
					else{
						debugger
						typeof reject == 'function' ? reject(res.msg || res.data) : console.log(new Error('reject must be a function'));
					}
				},
				//数据请求失败
				error(err){
					
					typeof reject == 'function' ? reject(err.statusText) : console.log(new Error('reject must be a function'));
				}
			})
		})
	}

	//做登录,强制进入登录页面
	doLogin(){
		// 加入redirect参数表明是从哪跳过来的 encodeURIComponent() 方法处理特殊字符
		window.location.href='/login?redirect=' + encodeURIComponent(window.location.pathname);
	}

	//获取URL参数
	getUrlParam(name){
		let queryString = window.location.search.split('?')[1] || '';
		let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		let result = queryString.match(reg);
		//判断result是否存在，存在取值，不存在取null
		return result ? decodeURIComponent(result[2]) : null ;
	}
	//成功提示
	successTips(successMsg){
		alert(successMsg || '操作成功');
	}

	//错误提示
	errTips(errMsg){
		alert(errMsg || '好像哪里不对了~');
	}
	
	//建立本地存储
	setStorage(name,data){
		let dataType = typeof data;

		//json形式存储
		 if(dataType === 'object'){
		 	window.localStorage.setItem(name,JSON.stringify(data));
		 }
		 //基本类型存储
		 else if(['number','string','boolean'].indexOf(dataType) >= 0){
		 	window.localStorage.setItem(name,data);
		 }
		 else{
		 	alert('该类型不能用于本地存储');
		 }
	}

	//取出本地存储的内容
	getStorage(name){
		let data = window.localStorage.getItem(name);
		if(data){
			return JSON.parse(data);
		}
		else{
			return '';
		}
	}

	//删除本地存储
	removeStorage(name){
		window.localStorage.removeItem(name);
	}
};



export default LuckyUtil;
