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

exports.login = async (req, res, next) => {};