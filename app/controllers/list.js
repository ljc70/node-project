const ApiError = require('../error/ApiError');
const ApiErrorNames = require('../error/ApiErrorNames');
const List = require('../../db/models/List');

// 增
exports.createListItem = async (ctx, next) => {
  const { role = 0, desc = '' } = ctx.request.body
  const result = await new List({role, desc, updated: Date.now()}).save().then(res => {
    if (res) {
      return true
    }
  }).catch(() => {
    throw new ApiError(ApiErrorNames.CREATE_LIST_FAIL)
  })
  ctx.body = result
}

// 查
exports.findList = async (ctx, next) => {
  const { pageNum = 1, pageSize = 20 } = ctx.query
  const list = await List.paginate({}, {page: pageNum, limit: parseInt(pageSize), sort: { fId: 1 }}).then(res => {
    return res || {}
  }).catch(() => {
		throw new ApiError(ApiErrorNames.FIND_LIST_FAIL);
	});
  ctx.body = list
}

// 改
exports.changeListItem = async (ctx, next) => {
  const { id = '', desc = '', role } = ctx.request.body
  const result = await List.findByIdAndUpdate(id, { $set: { role, desc, updated: Date.now() }}).then(res => {
    if (res) {
      return true
    }
  }).catch(() => {
		throw new ApiError(ApiErrorNames.UPDATE_LIST_FAIL);
	});
  ctx.body = result
}

// 删
exports.deleteListItem = async (ctx, next) => {
  const { id = ''} = ctx.request.body
  const result = await List.deleteOne({ _id: id }).then(res => {
    if (res) {
      return true
    }
  }).catch(() => {
    throw new ApiError(ApiErrorNames.DELETE_LIST_FAIL);
  })
  ctx.body = result
}