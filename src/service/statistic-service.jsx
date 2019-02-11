import React from 'react';
import LuckyUtil from 'util/lucky.jsx'; 

const _lucky = new LuckyUtil();

class Statistic extends React.Component{
	constructor(props){
		super(props);
	}

	//首页数据统计
	getHomeCount(){
		return _lucky.request({
			url:'/manage/statistic/base_count.do'
		})
	}
}



export default Statistic;