const Goods = require('../model/goods.js')
const { CustomError, HttpError } = require('../utils/customError.js')
const { handleSuccess, handleError } = require('../utils/handle')

class GoodsController {
  // 获取列表
  static async getList(ctx) { 
    let { currentPage = 1, pageSize = 10 } = ctx.query
    // 过滤条件
    const options = {
      sort: { lastModifiedDate: -1 }, 
      page: Number(currentPage), // 当前页
      limit: Number(pageSize) // 每页数
    }
    // 查询
    const result = await Goods
      .paginate({}, options)
      .catch(err => {
        throw new CustomError(500, '服务器内部错误')
        return false
      })
    if (result) {
      handleSuccess({
        ctx, msg: '列表数据获取成功', data: {
          pagination: {
            currentPage: result.page, // 当前页
            pageSize: result.limit, // 分页大小 
            totalPage: result.pages, // 总页数
            total: result.total, // 总条数
          },
          list: result.docs
        }
      })
    } else {
      handleError({ ctx, msg: '获取列表数据失败' })
    }
  }
  static async getAllList(ctx) {
    const result = await Goods.find()
      .catch(err => {
        throw new CustomError(500, '服务器内部错误')
        return false
      })
    if (result) handleSuccess({ ctx, msg: '列表数据获取成功', data: result })
    else handleError({ ctx, msg: '获取列表数据失败' })
  }
  static async info(ctx) {
    let { id } = ctx.query
    let result = await Goods.findOne({ _id: id }).exec().catch(err => {
			throw new CustomError(500, '服务器内部错误')
			return false
    })
    if (result) {
      handleSuccess({ ctx, msg: '获取信息成功！',
        data: result
      })
		} else {
			handleError({ ctx, msg: '获取信息失败！' })
		}
  }
  // 新增
  static async add(ctx) {
    //es6对象解构赋值
    const { name , describe, price, category} = ctx.request.body //请求参数放在请求体
    const result = await new Goods({name, describe, price, category, createDate: Date.now(), lastModifiedDate: Date.now() })
      .save()
      .catch(err => {
        throw new CustomError(500, '服务器内部错误')
        return false
      })
    if (result) handleSuccess({ ctx, msg: '新增链接成功', data: result })
    else handleError({ ctx, msg: '新增链接失败' })
  }
  static async edit(ctx) {
    const _id = ctx.params.id

    const { name} = ctx.request.body

    if (!_id) {
      throw new CustomError(500, '无效参数')
      return false
    }

    const result = await Goods
      .findByIdAndUpdate(_id, { name }) // new: true ？？？
      .catch(err => {
        throw new CustomError(500, '服务器内部错误')
        return false
      })
    console.log('result---ActiveType', result)
    if (result) handleSuccess({ ctx, msg: '修改数据成功', data: result })
    else handleError({ ctx, msg: '修改数据失败' })
  }
  static async delete(ctx) {
    const _id = ctx.params.id
    if (!_id) {
      throw new CustomError(500, '无效参数')
      return false
    }
    const result = await Goods
      .findByIdAndRemove(_id)
      .catch(err => {
        throw new CustomError(500, '服务器内部错误')
        return false
      })
    if (result) handleSuccess({ ctx, msg: '删除成功', data: result })
    else handleError({ ctx, msg: '删除失败' })
  }
}

module.exports = GoodsController