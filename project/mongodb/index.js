// // mongoose数据库模块
const mongoose = require('mongoose')
const config = require('../config')

mongoose.Promise = global.Promise
mongoose.set('useFindAndModify', false)
module.exports = () =>{
	const mongoUrl = `mongodb://${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.database}`;
		// 连接数据库
	// 新版mongodb连接数据库要加{ useNewUrlParser:true }
	mongoose.connect(mongoUrl, { 
		useCreateIndex: true,
		useNewUrlParser: true
	})
	
	const db = mongoose.connection
	// 连接错误处理
	db.on('error',()=>{
		console.log('数据库连接出错！')
	})
	// 连接成功处理
	db.once('open',()=>{
		console.log('数据库连接成功！')
	})

	return mongoose
}
