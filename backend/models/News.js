const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
    name: { type: String}, 
    orders: { type: Number},
    createAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('News', NewsSchema);