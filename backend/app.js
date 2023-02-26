const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const bp = require('body-parser');
const multer = require('multer');
const env = require('dotenv');
const bannerRouter = require('./router/banner');
const userRouter = require('./router/user');

env.config();
const imageFileStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		if (file.fieldname === 'document') {
			cb(null, 'files/docs');
		} else {
			cb(null, 'files/images');
		}
	},
	filename: (req, file, cb) => {
		cb(
			null,
			new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname
		);
	},
});

const imageFileFilter = (req, file, cb) => {
	if (file.fieldname === 'document') {
		if (
			file.mimetype === 'application/pdf' ||
			file.mimetype === 'application/msword' ||
			file.mimetype ===
				'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
			file.mimetype === 'application/vnd.ms-excel' ||
			file.mimetype ===
				'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
			file.mimetype === 'application/vnd.ms-powerpoint' ||
			file.mimetype ===
				'application/vnd.openxmlformats-officedocument.presentationml.presentation'
		) {
			cb(null, true);
		} else {
			cb(null, false);
		}
	} else {
		if (
			file.mimetype === 'image/png' ||
			file.mimetype === 'image/jpg' ||
			file.mimetype === 'image/jpeg' ||
			file.mimetype === 'image/ico' ||
			file.mimetype === 'image/webp'
		) {
			cb(null, true);
		} else {
			cb(null, false);
		}
	}
};

app.use(cors());

app.use(bp.json({ extended: true, limit: '10mb' }));
app.use(bp.urlencoded({ extended: true, limit: '10mb' }));
app.use('/upload', express.static(path.join(__dirname, 'upload')));
app.use('/files', express.static(path.join(__dirname, 'files')));
app.use(
	multer({ storage: imageFileStorage, fileFilter: imageFileFilter }).fields([
		{ name: 'images', maxCount: 10 },
		{ name: 'avatar', maxCount: 1 },
		{ name: 'thumbnail', maxCount: 1 },
		{ name: 'document', maxCount: 1 },
	])
);

app.use(bannerRouter);
app.use(userRouter);
mongoose.connect(process.env.mongourl, () => {
	console.log('Connected to database');
	app.listen(process.env.dev, () => {
		console.log(
			` http://localhost:${process.env.dev} Порт дээр амжилттай аслаа`
		);
	});
});
