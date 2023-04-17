const mongoose = require('mongoose');

const ValuesSchema = new mongoose.Schema({
    name: { type: String },
    description:{type:String},
    avatar: { type: String },
    createAt: {
        type: Date, 
        default: Date.now,
    },
});

module.exports = mongoose.model('Values', ValuesSchema);
