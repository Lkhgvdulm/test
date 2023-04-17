const Workplace = require('../models/Workplace');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../middleware/myError');

exports.getWorkplace = catchAsync(async(req, res) => {
    const workplace = await Workplace.find();
    res.status(200).json ({
        success: true,
        data: workplace,
    });
});
exports.createWorkplace = catchAsync(async(req, res, next) => {
    try {
    const { name, description } = req.body;
    const workplace_image = new Workplace({
        name: name,
        description: description,
    });
    const data = await workplace_image.save();
    res.status(200).json({
        success: true, 
        data: data,
    });
    } catch (err) {
        next(err);
        console.log(err);
    }
});
exports.editWorkplace = catchAsync(async(req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const workplace = await Workplace.findById(id);
        if(name) {
            workplace.name = name;
        }
        if(description) {
            workplace.description = description;
        }
        if(newAvatar) {
            workplace.avatar = avatar[0].path;
        } else {
            workplace.avatar = avatarOld;
        }
        const saveWorkplace_images = await workplace.save();
        if(saveWorkplace_images) {
            res.json({
                success: true,
            });
        }
    } catch (err) {
        console.log(err);
        res.json ({
            success: true,
        })
    }
});

exports.deleteWorkplace = catchAsync(async(req, res, next) => {
    const { id } = req.params;
    const workplace = await Workplace.findByIdAndDelete(id);
    if(!workplace) {
        return next(new AppError('fails', 400));
    }
    res.status(200).json ({
        success: true,
        data: workplace,
    });
});