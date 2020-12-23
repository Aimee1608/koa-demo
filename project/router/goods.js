const router = require('koa-router')();
const category = require('../controller/goods.js')
router.get('/list', category.getList)
router.get('/allList',  category.getAllList)
router.post('/', category.add)
router.delete('/:id', category.delete)
router.put('/:id',  category.edit)

module.exports = router;
