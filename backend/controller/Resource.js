const Resource = require('../models/Resource');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../middleware/myError');

exports.getResource = catchAsync(async (req, res) => {
	const resource = await Resource.find();
	res.status(200).json({
		success: true,
		data: resource,
	});
});
exports.createResource = catchAsync(async (req, res, next) => {
	try {
		const { name, description } = req.body;
		console.log("asdf",req.body)
		const { avatar } = req.files;
		const resource_image = new Resource({
			avatar: avatar[0].path,
			name: name,
			description: description,
		});
		const resource = await resource_image.save();
		res.status(200).json({
			success: true,
			data: resource,
		});
	} catch (err) {
		next(err);
		console.log(err);
	}
});

exports.editResource = catchAsync(async (req, res) => {
	try {
		const { id } = req.params;
		const { name, description, newAvatar, avatarOld } = req.body;
		const resource = await Resource.findById(id);
		if (name) {
			resource.name = name;
		}
		if (description) {
			resource.description = description;
		}
		if (newAvatar) {
			resource.avatar = avatar[0].path;
		} else {
			resource.avatar = avatarOld;
		}
		const saveResource_images = await resource.save();
		if (saveResource_images) {
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

exports.deleteResource = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	const resource = await Resource.findByIdAndDelete(id);
	if (!resource) {
		return next(new AppError('fails', 400));
	}
	res.status(200).json({
		success: true,
		data: resource,
	});
});
