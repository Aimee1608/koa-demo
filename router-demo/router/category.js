const router = require('koa-router')();

router.get('/', async (ctx) => {
  // ctx  上下文 context ，包含了request 和response等信息
  ctx.body = '分类接口~';
});

module.exports = router;
