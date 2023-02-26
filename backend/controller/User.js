const User = require('../models/User');
const WebError = require('../utils/Error');
const jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {
	const user = await User.create(req.body);
	const token = user.getJsonWebToken();
	res.status(200).json({
		success: true,
		token,
		user: user,
	});
};

exports.login = async (req, res, next) => {
	const { email, password } = req.body;
	if (!email || password) {
		return res.json({
			success: false,
			result: 'Имэйл болон нууц үг ээ оруулна уу !!!',
		});
	}
	const user = await User.findOne({ email }).select('+password');
	if (!user) {
		return res.json({
			success: false,
			result: 'Хэрэглэгч олдсонгүй',
		});
	}
	const ok = await user.checkPassword(password);
	if (!ok) {
		return res.json({
			success: false,
			result: 'Нууц үг буруу байна !',
		});
	}
	if (ok) {
		res.status(200).json({
			success: true,
			token: user.getJsonWebToken(),
			user: user,
		});
	}
};
