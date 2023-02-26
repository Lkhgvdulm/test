const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
	},
	email: {
		type: String,
		unique: true,
		match: [
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			'Имэйл хаяг буруу байна.',
		],
	},
	role: {
		type: String,
		enum: ['user', 'admin'],
		default: 'user',
	},
	password: {
		type: String,
		minlength: 4,
		select: false,
	},
	resetPasswordToken: String,
	resetPasswordExpire: Date,
	createAt: {
		type: Date,
		default: Date.now,
	},
});

UserSchema.pre('save', async function () {
	console.time('salt');
	const salt = await bcrypt.genSalt(10);
	console.timeEnd('salt');
	console.time('hash');
	this.password = await bcrypt.hash(this.password, salt);
	console.timeEnd('hash');
});

UserSchema.methods.getJsonWebToken = function () {
	const token = jwt.sign(
		{ id: this._id, role: this.role },
		process.env.JWT_SECRET,
		{
			expiresIn: process.env.JWT_EXPIRESIN,
		}
	);
	return token;
};

UserSchema.methods.checkPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
