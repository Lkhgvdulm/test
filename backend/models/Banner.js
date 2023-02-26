const mongoose = require('mongoose');

const BannerSchema = new mongoose.Schema({
	name: { type: String },
	orders: { type: Number },
	avatar: { type: String },
	createAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Banner', BannerSchema);
