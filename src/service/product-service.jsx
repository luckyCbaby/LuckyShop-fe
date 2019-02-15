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
	//获取商品详情
	getProduct(productId){
		return _lucky.request({
			url: '/manage/product/detail.do',
			type : 'post',
			data : {
				productId : productId || 0
			}
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
	//根据父品类的id获取品类列表
	getCategoryList(parentCategoryId){
		return _lucky.request({
			url : '/manage/category/get_category.do',
			type : 'post',
			data : {
				categoryId : parentCategoryId || 0
			}
		})
	}
	//检查商品表单信息
	checkProduct(product){
		let result ={
			status : true,
			msg : '验证通过'
		};
		//商品名称不是字符串时，或者为空时
		if(typeof product.name !== 'string' || product.name.length === 0){
			return {
				status : false,
				msg : '商品名称不能为空'
			}
		}
		//商品描述为空时，或者不是字符串时
		if(typeof product.subtitle !== 'string' || product.subtitle.length === 0){
			return {
				status : false,
				msg : '商品描述不能为空'
			}
		}
		//品类id不为number时，或者小于等于0时
		if(typeof product.categoryId !== 'number' || !(product.categoryId) > 0){
			return {
				status : false ,
				msg :'请选择商品品类'
			}
		}
		//商品价格不为数字时，后者小于0时
		if(typeof product.price !== 'number' || !(product.price) >= 0){
			return {
				status : false,
				msg : '请输入正确的商品价格'
			}
		}
		//商品库存不为number时，或者小于0时
		if(typeof product.stock !== 'number' || !(product.stock) >= 0){
			return {
				status : false,
				msg : '请输入正确的商品库存数量'
			}
		}
		return result;
	}
}




export default Product;