const mongoose = require('mongoose');

const DirectorSchema = new mongoose.Schema({
    name: { type: String },
    orders: { type: Number },
    avatar: { type: String },
    createAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Director', DirectorSchema);