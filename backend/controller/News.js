const News = require('../models/News');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../middleware/myError');
const Director = require('../models/Director');

exports.getNews = catchAsync(async(req, res) => {
    const news = await News.find();
    res.status(200).json ({
        success: true,
        data: news,
    });
});

exports.createNews = catchAsync(async(req, res, next) => {
    try {
        const { name, description } = req.body;
        const { avatar } = req.files;
        const news_image = new News({
            avatar: avatar[0].path,
            name: name,
            description: description,
        });
        const news = await news_image.save();
        res.status(200).jsonm ({
            success: true, 
            data: news,
        });
    } catch (err) {
        next(err);
        console.log(err);
    }
});

exports.editNews = catchAsync(async(req, res) => {
    try {
        const { id } = req.params;
        const { name, description, newAvatar, avatarOld } = req.body;
        const news = await News.findById(id);
        if(name) {
            news.name = name;
        }
        if(orders) {
            news.description = description;
        }
        if(newAvatar) {
            news.avatar = avatarOld;
        }
        const saveNews_images = await news.save();
        if(saveNews_images) {
            res.json ({
                success: true,
            });
        }
    } catch (err) {
        console.log(err);
        res.json ({
            success: true,
        })
    }
})

exports.deleteNews = catchAsync(async(req, res, next) => {
    const { id } = req.params;
    const news = await News.findByIdAndDelete(id);
    if(!news) {
        return next(new AppError('fails', 400));
    }
    res.status(200).json ({
        success: true,
        data: news,
    });
}); 