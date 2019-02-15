import LuckyUtil from 'util/lucky.jsx';


const _lucky = new LuckyUtil();





class Order{
	//请求订单列表
	getOrderList(listParam){
		let url = '';
		let data = {};
		if(listParam.listType === 'list'){
			url = '/manage/order/list.do';
			data.pageNum = listParam.pageNum;
		}else if(listParam.listType === 'search'){
			url = '/manage/order/search.do';
			data.pageNum = listParam.pageNum;
			data.orderNo = listParam.orderNo;
		}
		return _lucky.request({
			url : url ,
			type : 'post',
			data : data
		})
	}
	//获取订单详情
	getOrderDetail(orderNumber){
		return _lucky.request({
			url : '/manage/order/detail.do',
			type : 'post',
			data : {
				orderNo : orderNumber
			}
		})
	}
	//发货
	sendGoods(orderNumber){
		return _lucky.request({
			url : '/manage/order/send_goods.do',
			type : 'post',
			data : {
				orderNo : orderNumber
			}
		})
	}
}




export default Order;