const mongoose = require('mongoose');

const WorkplaceSchema = new mongoose.Schema({
    name: { type: String },
    orders: { type: Number }, 
    avatar: { type: String },
    createAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Workplace', WorkplaceSchema);