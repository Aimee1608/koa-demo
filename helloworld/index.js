const Koa = require('koa');

const app = new Koa();


app.use(async (ctx, next) => {
  console.log('1.这是一个中间件01');
  await next();
  console.log('5.匹配完路由以后又会返回来执行中间件')
});
app.use(async (ctx, next) => {
  console.log('2.这是一个中间件02');
  await next();
  console.log('4.匹配完路由以后又会返回来执行中间件')
});

app.use(async (ctx) => {
  console.log('3.匹配到了');
  ctx.body = 'Hello World';
});

app.listen(3000);
