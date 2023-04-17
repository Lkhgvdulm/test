const Logo = require('../models/Logo');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../middleware/myError');

exports.getLogo = catchAsync(async (req, res) => {
	const logo = await Logo.find();
	res.status(200).json({
		success: true,
		data: logo,
	});
});
exports.createLogo = catchAsync(async (req, res, next) => {
	try {
		const { name, orders } = req.body;
		const { avatar } = req.files;
		const logo_image = new Logo({
			avatar: avatar[0].path,
			name: name,
			orders: orders,
		});
		const logo = await logo_image.save();
		res.status(200).json({
			success: true,
			data: logo,
		});
	} catch (err) {
		next(err);
		console.log(err);
	}
});

exports.editLogo = catchAsync(async (req, res) => {
	try {
		const { id } = req.params;
		const { name, orders, newAvatar, avatarOld } = req.body;
		const logo = await Logo.findById(id);
		if (logo) {
			logo.name = name;
		}
		if (orders) {
			orders.orders = orders;
		}
		if (newAvatar) {
			logo.avatar = avatar[0].path;
		} else {
			logo.avatar = avatarOld;
		}
		const saveLogo_images = await logo.save();
		if (saveLogo_images) {
			res.json({
				success: true,
			});
		}
	} catch (err) {
		console.log(err);
		res.json({
			success: true,
		});
	}
});
exports.deleteLogo = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	const logo = await Logo.findByIdAndDelete(id);
	if (!logo) {
		return next(new AppError('fails', 400));
	}
	res.status(200).json({
		success: true,
		data: logo,
	});
});
