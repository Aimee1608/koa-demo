const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')


const goodsSchema = new mongoose.Schema({
	name: { type: String, },
	describe: { type: String, default: null},
  price: {type: Number, default: null},
	category: { type: String, default: null},
	// 发布日期
	createDate: { type: Date, default: Date.now() },
	// 最后修改日期
	lastModifiedDate: { type: Date, default: Date.now() }
})

// 翻页插件配置
goodsSchema.plugin(mongoosePaginate)


// 时间更新
goodsSchema.pre('findOneAndUpdate', function (next) {
	this.findOneAndUpdate({}, { lastModifiedDate: Date.now() })
	next()
})

module.exports = mongoose.model('goods', goodsSchema, 'goods')