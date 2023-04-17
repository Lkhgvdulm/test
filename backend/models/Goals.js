const mongoose = require('mongoose');

const GoalsSchema = new mongoose.Schema({
    name: { type: String}, 
    orders: { type: Number},
    createAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Goals', GoalsSchema);