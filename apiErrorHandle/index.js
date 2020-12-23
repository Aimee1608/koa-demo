const Koa = require('koa');
const app = new Koa();
const routers = require('./router/index');
const path = require('path');
const koaBody = require('koa-body');
const json = require('koa-json');
const logger = require('koa-logger');
const onerror = require('koa-onerror');
const responseFormatter = require('./middleware/response_formatter');
const { app:apiConfig } = require('./config/index');
// koa的错误处理程序hack
onerror(app);

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

// response formatter
app.use(responseFormatter(apiConfig.routerBaseApi));

// routers
app.use(routers.routes()).use(routers.allowedMethods());
// 监听error
app.on('error', (err, ctx) => {
  // 在这里可以对错误信息进行一些处理，生成日志等。
  console.error('server error', err, ctx);
});

app.listen(8123, '127.0.0.1', () => {
  console.log(`The server is running at http://127.0.0.1:8123`)
});
