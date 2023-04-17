const Address = require('../models/Address');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../middleware/myError');

exports.getAddress = catchAsync(async(req, res) => {
    const address = await Address.find();
    res.status(200).json ({
        success: true,
        data: address,
    });
});

exports.createAddress = catchAsync(async(req, res, next) => {
    try {
        const { name, orders } = req.body;
        const { avatar } = req.files;
        const address_image = new Address({
            avatar: avatar[0].path,
            name: name,
            orders: orders,
        });
        const address = await address_image.save();
        res.status(200).json ({
            success: true,
            data: address,
        })
    } catch (err) {
        next(err);
        console.log(err);
    }
});

exports.editAddress = catchAsync(async(req, res) => {
    try {
        const { id } = req.params;
        const { name, orders, newAvatar, avatarOld } = req.body;
        const address = await Address.findById(id);
        if(name) {
            address.name = name;
        }
        if(orders) {
            address.orders = orders;
        }
        if(newAvatar) {
            address.avatar = avatar[0].path;
        } else {
            address.avatar = avatarOld;
        }
        const saveAddress_images = await address.save();
        if(saveAddress_images) {
            res.json({
                success: true,
            });
        }
     } catch (err) {
        console.log(err);
        res.json ({
            success: true,
        });
     }
});
exports.deleteAddress = catchAsync(async(req, res, next) => {
    const { id } = req.params;
    const address = await Address.findByIdAndDelete(id);
    if(!address) {
        return next(new AppError('falis', 400));
    }
    res.status(200).json ({
        success: true,
        data: address,
    });
})