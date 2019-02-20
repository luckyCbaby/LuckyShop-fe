/*
 * @Author: shijie
 * @Date:   2019-01-29 12:26:47
 * @Last Modified by:   shijie
 * @Last Modified time: 2019-02-03 14:47:33
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
let WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
module.exports = {
	entry: './src/app.jsx',
	output: {
		path: path.resolve(__dirname, './dist'),
		publicPath:WEBPACK_ENV === 'dev' 
            ? '/dist/' : '//s.dongcewei.com/LuckyShop-fe/',
		filename: 'js/app.js'
	},
	module: {
		rules: [
			//react语法处理
			{
				test: /\.jsx$/,
				exclude: /(node_modules)/, //这个目录下的文件不做处理
				use: {
					loader: 'babel-loader',
					options: {
						//env即environment，自动根据环境打包，不管是浏览器环境还是node环境
						presets: ['env', 'react']
					}
				}
			},
			//css文件处理
			{
				test: /\.css$/,
				use: ExtractTextWebpackPlugin.extract({
					fallback: 'style-loader',
					use: 'css-loader'
				})
			},
			//sass文件处理
			{
				test: /\.scss$/,
				use: ExtractTextWebpackPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'sass-loader']
				})
			},
			//图片及静态文件处理
			{
				test: /\.(png|jpg|gif)$/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 8192,
						name: 'resource/[name].[ext]' //指定图片打包路径，[ext]表示它是什么后缀导出什么后缀
					}
				}
			},
			//字体图标的处理,和图片的配置一样
			{
				test: /\.(woff|woff2|eot|svg|ttf|tof)$/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 8192,
						name: 'resource/[name].[ext]'
					}
				}
			}
		]
	},
	//配置webpack-dev-server
	devServer: {
		contentBase: './dist',
		port: 8020,
		open: true, //执行webpack-dev-server自动打开浏览器
		//访问一个页面找不到会返回一个指定页面
		historyApiFallback: {
			index: '/dist/index.html'
		},
		//服务器代理接口
		proxy:{
			//用户登录接口
			// '/manage' : {
   //              target: 'http://admintest.happymmall.com',
   //              changeOrigin : true
   //          },
            '/user/logout.do' : {
            	target : 'http://admintest.happymmall.com',
                changeOrigin : true
            }
		}
	},
	resolve: {
		//处理别名,
		alias: {
			//将绝对路径下的src/page取别名叫page
			page: path.resolve(__dirname, 'src/page'),
			component: path.resolve(__dirname, 'src/component'),
			util:path.resolve(__dirname,'src/util'),
			service:path.resolve(__dirname,'src/service'),
		}
	},
	plugins: [
		//提出html文件
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html', //打包后的文件
			favicon: './favicon.ico' //处理favicon
		}),
		//独立css文件
		new ExtractTextWebpackPlugin('css/[name].css'),
		//提出公共模块
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common', //name属性是手动指定的公共模块
			filename: 'js/base.js' //公共模块打包到指定文件
		})
	]
}