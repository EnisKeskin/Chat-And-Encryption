const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatShema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        minlength: 8,
        required: true,
    },
    message: {
        type: String,
        maxlength: 256,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('chat', chatShema);