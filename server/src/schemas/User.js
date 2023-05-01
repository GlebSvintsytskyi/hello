import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema(
{
    email: {
        type: String,
        required: 'Email address is required',
        unique: true,
        validate: {
            validator: function (v) {
              return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: '{VALUE} is not a valid email!'
          }
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
    last_seen: {
        type: Date,
        default: new Date()
    },
}, {
    timestamps: true
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;