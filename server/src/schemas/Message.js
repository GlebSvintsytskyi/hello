import mongoose from 'mongoose';

const { Schema } = mongoose;

const MessageSchema = new Schema(
{
    text: { type: String, require: Boolean },
    dialog: { type: Schema.Types.ObjectId, ref: 'Dialog', require: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', require: true },
    unread: { type: Boolean, default: false }
}, {
    timestamps: true
});

const MessageModel = mongoose.model('Message', MessageSchema);

export default MessageModel;