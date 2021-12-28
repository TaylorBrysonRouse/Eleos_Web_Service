const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema (
{
    direction: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    message_type: {
        type: String,
        required: true
    },
    body: {
      type: String,
      required: false
    },
    composed_at: {
        type: String,
        required: true
    },
    platform_received_at:{
        type: String,
        required: true
    }
},
{
    toJSON: {
        transform(doc, ret) {
        delete ret._id;
        },
        versionKey: false,
    },
})

module.exports = Message = mongoose.model('messages', messageSchema);
