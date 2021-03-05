/**
 * API错误名称
 */
let ApiErrorNames = {};

ApiErrorNames.UNKNOW_ERROR = "unknowError";
ApiErrorNames.UNAUTHORIZED_ERROR = "unauthorizedError";
ApiErrorNames.REG_FAIL = "regFail";
ApiErrorNames.USER_EXIST = "userExist";
ApiErrorNames.PARAM_IMPROPER = "paramImproper";
ApiErrorNames.CREATE_LIST_FAIL = "createListFail"
ApiErrorNames.FIND_LIST_FAIL = "findListFail"
ApiErrorNames.UPDATE_LIST_FAIL = "updateListFail"
ApiErrorNames.DELETE_LIST_FAIL = "deleteListFail"

/**
 * API错误名称对应的错误信息
 */
const error_map = new Map();

error_map.set(ApiErrorNames.UNKNOW_ERROR, { code: -1, message: '未知错误' });
error_map.set(ApiErrorNames.UNAUTHORIZED_ERROR, { code: 4, message: '未授权，访问被拒绝' });
error_map.set(ApiErrorNames.REG_FAIL, { code: 2, message: '注册失败' });
error_map.set(ApiErrorNames.USER_EXIST, { code: 2, message: '用户已存在' });
error_map.set(ApiErrorNames.PARAM_IMPROPER, { code: 3, message: '参数不合法' });
error_map.set(ApiErrorNames.UPDATE_LIST_FAIL, { code: 2, message: '更新失败' })
error_map.set(ApiErrorNames.DELETE_LIST_FAIL, { code: 2, message: '删除失败' })
error_map.set(ApiErrorNames.CREATE_LIST_FAIL, { code: 2, message: '新增失败' })
error_map.set(ApiErrorNames.FIND_LIST_FAIL, { code: 2, message: '获取列表失败' })



//根据错误名称获取错误信息
ApiErrorNames.getErrorInfo = (error_name) => {

    var error_info;

    if (error_name) {
        error_info = error_map.get(error_name);
    }

    //如果没有对应的错误信息，默认'未知错误'
    if (!error_info) {
        error_name = UNKNOW_ERROR;
        error_info = error_map.get(error_name);
    }
    
    return error_info;
}

module.exports = ApiErrorNames;