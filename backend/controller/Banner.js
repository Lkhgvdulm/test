const Banner = require('../models/Banner');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../middleware/myError');

exports.getBanner = catchAsync(async (req, res) => {
	const banner = await Banner.find();
	res.status(200).json({
		success: true,
		data: banner,
	});
});

exports.createBanner = catchAsync(async (req, res, next) => {
	try {
		const { name, orders } = req.body;
		const { avatar } = req.files;
		const banner_images = new Banner({
			avatar: avatar[0].path,
			name: name,
			orders: orders,
		});
		const banner = await banner_images.save();
		res.status(200).json({
			success: true,
			data: banner,
		});
	} catch (err) {
		next(err);
		console.log(err);
	}
});

exports.editBanner = catchAsync(async (req, res) => {
	try {
		const { id } = req.params;
		const { name, orders, newAvatar, avatarOld } = req.body;
		const banner = await Banner.findById(id);
		if (name) {
			banner.name = name;
		}
		if (orders) {
			banner.orders = orders;
		}
		if (newAvatar) {
			banner.avatar = avatar[0].path;
		} else {
			banner.avatar = avatarOld;
		}
		const saveBanner_images = await banner.save();
		if (saveBanner_images) {
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

exports.deleteBanner = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	const banner = await Banner.findByIdAndDelete(id);
	if (!banner) {
		return next(new AppError('fails', 400));
	}
	res.status(200).json({
		success: true,
		data: banner,
	});
});
