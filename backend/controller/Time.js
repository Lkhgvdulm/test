const Time = require('../models/Time');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../middleware/myError');

exports.getTime = catchAsync(async(req, res) => {
    const time = await Time.find();
    res.status(200).json ({
        success: true,
        data: time,
    });
});
exports.createTime = catchAsync(async(req, res, next) => {
    try {
        const { name, orders } = req.body;
        const { avatar } = req.files; 
        const time_image = new Time({
            avatar: avatar[0].path,
            name: name,
            orders: orders,
        });
        const time = await time_image.save();
        res.status(200).json({
            success: true,
            data: time,
        });
    } catch (err) {
        next(err);
        console.log(err);
    }
});

exports.editTime = catchAsync(async(req, res) => {
    try {
        const { id } = req.params;
        const { name, orders, newAvatar, avatarOld } = req.body;
        const time = await Time.findById(id);
        if(name) {
            time.name = name;
        }
        if(orders) {
            time.orders = orders;
        }
        if(newAvatar) {
            time.avatar = avatar[0].path;
        } else {
            time.avatar = avatarOld;
        }
        const saveTime_images = await time.save();
        if(saveTime_images) {
            res.json({
                success: true,
            });
        }
    } catch(err) {
        console.log(err);
        res.json ({
            success:true,
        });
    }
});

exports.deleteTime = catchAsync(async(req, res, next) =>{
    const { id } = req.params;
    const time = await time.findByIdAndDelet(id);
    if(!time) {
        return next(new AppError('fails', 400));
    }
    res.status(200).json ({
        success: true, 
        data: time,
    });
});