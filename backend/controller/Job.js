const Job = require('../models/Job');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../middleware/myError');

exports.getJob = catchAsync(async (req, res) => {
	const job = await Job.find();
	res.status(200).json({
		success: true,
		data: job,
	});
});
exports.createJob = catchAsync(async (req, res, next) => {
	try {
		const { name } = req.body;
		const Job_create = new Job({
			name: name,
		});
		const data = await Job_create.save();
		res.status(200).json({
			success: true,
			data: data,
		});
	} catch (err) {
		next(err);
		console.log(err);
	}
});
exports.editJob = catchAsync(async (req, res) => {
	try {
		const { id } = req.params;
		const { name } = req.body;
		const Job = await Job.findById(id);
		if (name) {
			Job.name = name;
		}
		if (description) {
			Job.avatar = avatar[0].path;
		}
		if (newAvatar) {
			Job.avatar = avatarOld;
		}
		const saveJob_images = await Job.save();
		if (saveJob_images) {
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
exports.deleteJob = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	const Job = await Job.findByIdAndDelete(id);
	if (!Job) {
		return next(new AppError('fails', 400));
	}
	res.status(200).json({
		success: true,
		data: Job,
	});
});
