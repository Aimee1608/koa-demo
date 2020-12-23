const config = require('../utils/config.js')
const jwt = require('jsonwebtoken')
// import { CustomError, HttpError } from '../utils/customError'
// import constants from '../utils/constants'
const { CustomError, HttpError } = require('../utils/customError.js')
const constants = require('../utils/constants.js')

module.exports = async (ctx, next) => {
	// 获取请求头内容
	const authorization = ctx.get('authorization') // 这两种方式都可以拿到atuhorization
	// const authorization = ctx.request.header.atuhorization
	console.log(authorization)
	if(authorization){
		let token = authorization.split(' ')[1]
		try{
			// 验证token
			let decoded = jwt.verify(token, config.jwt.secret)
			// decoded值如下,解析后的exp=创建token的时间+之前设置的过期时间
			// { id: '5934afe7adb12d30f0679b41', iat: 1496629988, exp: 1496633588 } 
		}catch(err){
			// console.log(err)
			if ('TokenExpiredError' === err.name) {
				// invalid token token无效
				// jwt expired token过期
				throw new CustomError(constants.HTTP_CODE.UNAUTHORIZED, err.message)
			}
			//token验证失败
			throw new CustomError(constants.HTTP_CODE.UNAUTHORIZED, 'token验证失败')
		}
	}else{
		// header缺少token
		throw new CustomError(constants.UNAUTHORIZED, 'no token detected in http header Authorization')
	}
	// 鉴权成功
	await next()
}