const Koa = require('koa');
const app = new Koa();
const routers = require('./router/index');
const path = require('path');
const koaBody = require('koa-body');
const json = require('koa-json');
const logger = require('koa-logger');

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

// routers
app.use(routers.routes()).use(routers.allowedMethods());


app.listen(8223, '127.0.0.1', () => {
  console.log(`The server is running at http://127.0.0.1:8223`)
});
