const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatShema = new Schema({
    roomName: {
        type: String,
        maxlength: 256,
        required: true,
        // unique: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        minlength: 8,
        required: true,
    },
    message: [{
        userId: {
            type: Schema.Types.ObjectId,
            minlength: 8,
            // required: true,
        },
        msg: {
            type: String,
            maxlength: 256,
        },
        date: {
            type: Date,
            default: Date.now
        },
    }],

    Encryption: {
        type: Object
    }

})

module.exports = mongoose.model('chat', chatShema);