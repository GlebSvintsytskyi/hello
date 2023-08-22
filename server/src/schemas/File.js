import mongoose from 'mongoose';

const { Schema } = mongoose;

const FileSchema = new Schema(
{
    filename: String,
    size: Number,
    ext: String,
    url: String,
    message: { type: Schema.Types.ObjectId, ref: 'Message', require: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', require: true },
}, {
    timestamps: true
});

const FileModel = mongoose.model('File', FileSchema);

export default FileModel;