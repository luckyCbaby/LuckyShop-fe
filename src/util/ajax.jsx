class Ajax{
	ajax({
		url="",
		type="GET",
		asyn=true,
		data={},
		dataType='json',
		success=function(res){
			console.log(res)
		},
		error=function(err){
			console.log(new Error(`错误:${err}`))
		}
	}){
		function getData(param){
			let arr=[];
			for(let i in param){
				arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(param[i]));
			}
			return arr.join("&")
		};

		let params=getData(data);
		let xhr=null;
		//判断浏览器
		if(window.XMLHttpRequest){
			xhr=new XMLHttpRequest();
		}else{
			xhr=new ActiveXObject('Microsoft.XMLHTTP');
		};
		//判断数据提交方式
		switch(type.toUpperCase()){
			//如果是get方式提交
			case 'GET':
			xhr.open("GET",url + '?'+ params,asyn);
			xhr.send(null);
			break;
			//如果是post方式提交
			case 'POST':
			xhr.open("POST",url,asyn);
			//对于post方法setRequestHeader是必须的
			xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
			xhr.send(params);
			break;
		}

		//判断ajax是否已经完成响应
		xhr.onreadystatechange=function(){
			if(xhr.readyState === 4){ //ajax的状态是已经完成响应
				if(xhr.status >= 200 && xhr.status <= 300 || xhr.status === 304){//成功处理响应

					typeof success === 'function' ? success(JSON.parse(xhr.responseText)) : console.log(new Error('success must be a function'));
				} else {
					typeof error === 'function' ? error(xhr.status) : console.log(new Error('error must be a function'))
				}
			}
		}
	}
};


export default Ajax;