const mongoose = require('mongoose');
const { isEmail } = require('validator');

const { Schema } = mongoose;

const UserSchema = new Schema(
{
    email: {
        type: String,
        required: 'Email address is required',
        validate: [isEmail, 'Invalid email'],
        unique: true
    },
    avatar: String,
    fullname: {
        type: String,
        required: 'Fullname is required'
    },
    password: {
        type: String,
        required: 'Password address is required'
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    confirm_hash: String,
    last_seen: Date,
}, {
    timestamps: true
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;