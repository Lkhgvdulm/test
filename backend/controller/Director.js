const Director = require('../models/Director');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../middleware/myError');

exports.getDirector = catchAsync(async(req, res) => {
    const director = await Director.find();
    res.status(200).json({
        success: true,
        data: director,
    });
});
exports.createDirector = catchAsync(async(req, res, next) => {
    try {
        const { name, orders } = req.body;
        const { avatar } = req.files;
        const director_image = new Director({
            avatar: avatar[0].path,
            name: name,
            orders: orders,
        });
        const director = await director_image.save();
        res.status(200).json({
            success: true,
            data: director,
        });
    } catch (err) {
        next(err);
        console.log(err);
    }
});

exports.editDirector = catchAsync(async (req, res) => {
	try {
		const { id } = req.params;
		const { name, orders, newAvatar, avatarOld } = req.body;
		const director = await Director.findById(id);
		if (name) {
			director.name = name;
		}
		if (orders) {
			director.orders = orders;
		}
		if (newAvatar) {
		    director.avatar = avatar[0].path;
		} else {
			director.avatar = avatarOld;
		}
		const saveDirector_images = await director.save();
		if (saveDirector_images) {
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

exports.deleteDirector = catchAsync(async(req, res, next) => {
    const { id } = req.params;
    const director = await Director.findByIdAndDelete(id);
    if(!director) {
        return next(new AppError('fails', 400));
    }
    res.status(200).json ({
        success: true, 
        data: director,
    });
});