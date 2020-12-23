const ApiErrorNames = require('./api_error_name');

const ApiErrorMap = new Map();

ApiErrorMap.set(ApiErrorNames.NOT_FOUND, { code: ApiErrorNames.NOT_FOUND, message: '未找到该接口' });
ApiErrorMap.set(ApiErrorNames.UNKNOW_ERROR, { code: ApiErrorNames.UNKNOW_ERROR, message: '未知错误' });
ApiErrorMap.set(ApiErrorNames.LEGAL_ID, { code: ApiErrorNames.LEGAL_ID, message: 'id 不合法' });
ApiErrorMap.set(ApiErrorNames.UNEXIST_ID, { code: ApiErrorNames.UNEXIST_ID, message: 'id 不存在' });
ApiErrorMap.set(ApiErrorNames.LEGAL_FILE_TYPE, { code: ApiErrorNames.LEGAL_FILE_TYPE, message: '文件类型不允许' });
ApiErrorMap.set(ApiErrorNames.NO_AUTH, { code: ApiErrorNames.NO_AUTH, message: '没有操作权限' });

module.exports = ApiErrorMap;
