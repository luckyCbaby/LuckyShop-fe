import React from 'react';
import LuckyUtil from 'util/lucky.jsx';


const _lucky = new LuckyUtil();



class Product{
	//请求商品列表
	getProductList(listParam){
		let url='';
		let data ={};
		if(listParam.listType == 'list'){
			url ='/manage/product/list.do';
			data.pageNum = listParam.pageNum;
		}else if(listParam.listType == 'search'){
			url = '/manage/product/search.do';
			data.listType=listParam.listType;
			data[listParam.searchType] = listParam.keyword;
			data.pageNum = listParam.pageNum;
		}

		return _lucky.request({
			url : url,
			type : 'post',
			data : data
		})
	}
	//改变商品状态
	setProductStatus(productInfo){
		return _lucky.request({
			url:'/manage/product/set_sale_status.do',
			type : 'post',
			data : productInfo
		});
	}
	//保存商品
	saveProduct(prodct){
		return _lucky.request({
			url : '/manage/product/save.do',
			type : 'post',
			data : product
		})
	}
}




export default Product;