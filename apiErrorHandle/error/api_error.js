const ApiErrorMap = require('./api_error_map');

/**
 * 自定义Api异常
 */

class ApiError extends Error {
  constructor(errorName, errorMsg) {
    super();

    let errorInfo = {};
    if (errorMsg) {
      errorInfo = {
        code: errorName,
        message: errorMsg,
      };
    } else {
      errorInfo = ApiErrorMap.get(errorName);
    }

    this.name = errorName;
    this.code = errorInfo.code;
    this.message = errorInfo.message;
  }
}

module.exports = ApiError;
