const jwt = require('jsonwebtoken');
const ApiError = require('../error/ApiError');
const ApiErrorNames = require('../error/ApiErrorNames');
const crypto = require('crypto');
const User = require('../../db/models/User');

// 用户注册
exports.registerUser = async (ctx, next) => {
  const { password = '', username = '', desc = '' } = ctx.request.body
	const passwdReg = /^[a-zA-Z0-9]{6,18}$/;
	const usrReg = /^[a-zA-Z0-9]{4,18}$/;
	if(!passwdReg.test(password) || !usrReg.test(username)){
		throw new ApiError(ApiErrorNames.PARAM_IMPROPER);
	}
	const isNotExist = await User.findOne({ username }).then(res => {
		if (res) {
			throw new ApiError(ApiErrorNames.USER_EXIST);
		} else {
			return true
		}
	})
	if (isNotExist) {
		const passwd = crypto.createHash('md5').update(password).digest('hex');
		const result = await new User({password: passwd, username, desc}).save().then(res => {
			if (res) {
				return res
			}
		}).catch(() => {
			throw new ApiError(ApiErrorNames.REG_FAIL)
		})
		const token = jwt.sign({
			name: result.username,
			id: result._id,
			desc: result.desc
		}, 'my_token', { expiresIn: 60*60*48 })

		ctx.body={
			username: result.username,
			desc: result.desc,
			id: result._id,
			token: token
		}
	}
}

