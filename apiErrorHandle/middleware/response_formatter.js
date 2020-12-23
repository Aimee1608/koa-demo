const ApiError = require('../error/api_error');
const ApiErrorNames = require('../error/api_error_name');

const responseFormatter = (apiPrefix) => async (ctx, next) => {
  if (ctx.request.path.startsWith(apiPrefix)) {
    try {
      // 先去执行路由
      await next();

      if (ctx.response.status === 404) {
        throw new ApiError(ApiErrorNames.NOT_FOUND);
      } else {
        ctx.body = {
          code: 0,
          message: 'success',
          result: ctx.body,
        };
      }
    } catch (error) {
      // 如果异常类型是API异常，将错误信息添加到响应体中返回。
      if (error instanceof ApiError) {
        ctx.body = {
          code: error.code,
          message: error.message,
        };
      } else {
        ctx.status = 400;
        ctx.response.body = {
          code: error.name,
          message: error.message,
        };
      }
    }
  } else {
    await next();
  }
};

module.exports = responseFormatter;
