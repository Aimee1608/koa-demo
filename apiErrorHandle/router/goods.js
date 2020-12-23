const router = require('koa-router')();

router.get('/', async (ctx) => {
  const { query: { id } } = ctx;
  ctx.body = 'query形式商品接口~' + id;
});

// 动态路由
router.get('/:id', async (ctx) => {
  const { params: { id } } = ctx;
  ctx.body = '动态路由商品接口~'+ id;
});

router.post('/', async (ctx) => {
  ctx.body = ctx.request.body;
});

router.put('/:id', async (ctx) => {
  ctx.body = `PUT: ${ctx.params.id}`;
});

router.del('/:id', async (ctx) => {
  ctx.body = `DEL: ${ctx.params.id}`;
});

module.exports = router;