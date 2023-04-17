const Values = require('../models/Values');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../middleware/myError');

exports.getValues = catchAsync(async (req, res) => {
	const values = await Values.find();
	res.status(200).json({
		success: true,
		data: values,
	});
});
exports.createValues = catchAsync(async (req, res, next) => {
	try {
		const { name, description } = req.body;
		const { avatar } = req.files;
		const values_image = new Values({
			avatar: avatar[0].path,
			name: name,
			description: description,
		});
		const values = await values_image.save();
		res.status(200).json({
			success: true,
			data: values,
		});
	} catch (err) {
		next(err);
		console.log(err);
	}
});

exports.editValues = catchAsync(async (req, res) => {
	try {
		const { id } = req.params;
		const { name, description, newAvatar, avatarOld } = req.body;
		const values = await values.findById(id);
		if (name) {
			values.name = name;
		}
		if (description) {
			values.description = description;
		}
		if (newAvatar) {
			values.avatar = avatar[0].path;
		} else {
			values.avatar = avatarOld;
		}
		const saveValues_images = await values.save();
		if (saveValues_images) {
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
exports.deleteValues = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	const values = await Values.findByIdAndDelete(id);
	if (!values) {
		return next(new AppError('fails', 400));
	}
	res.status(200).json({
		success: true,
		data: values,
	});
});
