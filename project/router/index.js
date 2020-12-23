// routers/index.js
const router = require('koa-router')();
const { app } = require('../config/index');

const goods = require('./goods');
const category = require('./category');

router.prefix(app.routerBaseApi);

router.use('/goods', goods.routes(), goods.allowedMethods());
router.use('/categories', category.routes(), category.allowedMethods());

module.exports = router;
