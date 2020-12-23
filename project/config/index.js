// 全局参数配置
const config = {
	jwt: {
		secret: '123456', //撒盐：加密的时候混淆
		expiresIn: '10800s' //以秒为单位，token到期时间 3600s
	},
	// 本地使用（连接本地mongodb）
	mongodb: {
		host: '127.0.0.1',
		database: 'demoTest',
		port: 27027,
		user: '',
		password: '',
		rs_name: ''
	},
	app: {
		ip: process.env.ip,
		port: process.env.PORT || 8123, // server端口
		routerBaseApi: '/api', // 接口基础路径
		LIMIT: 16,
	}
}

// 注意区分es6与commonJS导出模块的写法
module.exports = config