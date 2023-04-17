const Goals = require('../models/Goals');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../middleware/myError');

exports.getGoals = catchAsync(async (req, res) => {
	const goals = await Goals.find();
	res.status(200).json({
		success: true,
		data: goals,
	});
});
exports.createGoals = catchAsync(async (req, res, next) => {
	try {
		const { name } = req.body;
		const Goals_create = new Goals({
			name: name,
		});
		const data = await Goals_create.save();
		res.status(200).json({
			success: true,
			data: data,
		});
	} catch (err) {
		next(err);
		console.log(err);
	}
});
exports.editGoals = catchAsync(async (req, res) => {
	try {
		const { id } = req.params;
		const { name } = req.body;
		const Goals = await Goals.findById(id);
		if (name) {
			Goals.name = name;
		}
		if (orders) {
			Goals.orders = orders;
		}
		if (newAvatar) {
			Goals.avatar = avatar[0].path;
		} else {
			Goals.avatar = avatarOld;
		}
		const saveGoals_images = await Goals.save();
		if (saveGoals_images) {
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
exports.deleteGoals = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	const goals = await Goals.findByIdAndDelete(id);
	if (!goals) {
		return next(new AppError('fails, 400'));
	}
	res.status(200).json({
		success: true,
		data: goals,
	});
});
