const Koa = require('koa');
const app = new Koa();
const routers = require('./router/index');
const path = require('path');
const koaBody = require('koa-body');
const json = require('koa-json');
const logger = require('koa-logger');
const mongodb = require('./mongodb')
const serve = require('koa-static') // 静态资源处理

const { CustomError, HttpError } = require('./utils/customError.js')

// 连接数据库
mongodb();
// koa的错误处理程序hack

// middlewares
app.use(koaBody({
  multipart: true, // 支持文件上传
  formidable: {
    formidable: {
      uploadDir: path.join(__dirname, 'public/upload/'), // 设置文件上传目录
      keepExtensions: true, // 保持文件的后缀
      maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小
      onFileBegin: (name, file) => { // 文件上传前的设置
        console.log(`name: ${name}`);
        console.log(file);
      },
    },
  },
}));
app.use(json());
app.use(logger());
// 处理自动抛出的异常
app.use((ctx, next) => {
	return next().catch((err) => {
		let code = 500
		let msg = 'unknown error'

		if (err instanceof CustomError || err instanceof HttpError) {
			const res = err.getCodeMsg()
			ctx.status = err instanceof HttpError ? res.code : 200
			code = res.code
			msg = res.msg
		} else {
			ctx.status = code
			console.error('err', err)
		}
		ctx.body = { success: false, code, msg, data: {} } 
	})
})

// routers
app.use(routers.routes()).use(routers.allowedMethods());

// 配置的静态文件夹地址, 用来访问图片，压缩后的前端代码等
// 前端访问时可以省略static这个目录
// 如 http://127.0.0.1:8123/img.png
app.use(serve(__dirname + '/static'));

app.listen(8123, '127.0.0.1', () => {
  console.log(`The server is running at http://127.0.0.1:8123`)
});
