import React from 'react';
import PageTitle from 'component/page-title/index.jsx';

import Product from 'service/product-service.jsx';
import LuckyUtil from 'util/lucky.jsx';


const _product = new Product();
const _lucky = new LuckyUtil();


class ProductSave extends React.Component{
	constructor(props){
		super(props);
		this.state={
			id : this.props.match.params.pid
		}
		debugger ;
		console.log(this.state.id);
	}
	render(){
		return(
			<div id="page-wrapper">
				<PageTitle title='商品管理 -- 添加商品' />
				<div className="form-horizontal">
					<div className="form-group">
						<label htmlFor="" className="col-md-2 control-label">商品名称</label>
						<div className="col-md-5">
							<input type="text" className="form-control"
							placeholder="请输入商品名称"
							name='name' />
						</div>
					</div>
					<div className="form-group">
						<label htmlFor="" className="col-md-2 control-label">商品描述</label>
						<div className="col-md-5">
							<input type="text" className="form-control"
								placeholder="请输入商品描述"
								name='subtitle' />
						</div>
					</div>
					<div className="form-group">
						<label className="col-md-2 control-label">所属分类</label>
					</div>
					<div className="form-group">
						<label htmlFor="" className="col-md-2 control-label">商品价格</label>
						<div className="col-md-3">
							<div className="input-group">
								<input type="number" className="form-control"
									placeholder="价格"
									name="price" />
								<span className="input-group-addon">元</span>
							</div>
						</div>
					</div>
					<div className="form-group">
						<label htmlFor="" className="col-md-2 control-label">商品库存</label>
						<div className="col-md-3">
							<div className="input-group">
								<input type="number" className="form-control"
									placeholder="库存"
									name="stock" />
								<span className="input-group-addon">件</span>
							</div>
						</div>
					</div>
					<div className="form-group">
						<label htmlFor="" className="col-md-2 control-label">商品图片</label>
						<div className="col-md-10">
							
						</div>
						<div className="col-md-offset-2 col-md-10 file-upload-con">
                            
                        </div>
					</div>
					<div className="form-group">
						<label htmlFor="" className="col-md-2 control-label">商品详情</label>
						<div className="col-md-10">
							
						</div>
					</div>
					<div className="form-group">
                        <div className="col-md-offset-2 col-md-10">
                            <button type="submit" className="btn btn-primary">提交</button>
                        </div>
                    </div>
				</div>
			</div>
		)
	}
}







export default ProductSave;