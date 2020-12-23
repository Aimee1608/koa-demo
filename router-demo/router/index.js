// routers/index.js
const router = require('koa-router')();

const goods = require('./goods');
const category = require('./category');

router.prefix('/api');

router.use('/goods', goods.routes(), goods.allowedMethods());
router.use('/categories', category.routes(), category.allowedMethods());

module.exports = router;
