const About = require('../models/About');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../middleware/myError');

exports.getAbout = catchAsync(async (req, res) => {
	const about = await About.find();
	res.status(200).json({
		success: true,
		data: about,
	});
});
exports.createAbout = catchAsync(async (req, res, next) => {
	try {
		const about = await About.create(req.body);
		res.status(200).json({
			success: true,
			data: about,
		});
	} catch (err) {
		next(err);
		console.log(err);
	}
});
exports.editAbout = catchAsync(async (req, res) => {
	try {
		const { id } = req.params;
		const { name, description, newAvatar, avatarOld } = req.body;
		const about = await About.findById(id);
		if (name) {
			about.name = name;
		}
		if (description) {
			about.description = description;
		}
		if (newAvatar) {
			about.avatar = avatar[0].path;
		} else {
			about.avatar = avatarOld;
		}
		const saveAbout_images = await about.save();
		if (saveAbout_images) {
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

exports.deleteAbout = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	const about = await About.findByIdAndDelete(id);
	if (!about) {
		return next(new AppError('fails', 400));
	}
	res.status(200).json({
		success: true,
		data: about,
	});
});
