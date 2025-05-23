const { Schema, models, model } = require('mongoose');

const userSchema = new Schema({
    fullname: { type: String, required: true, minLength: 3, maxLength: 20 },

    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 20,
        trim: true,
        lowercase: true,
    },

    email: {
        type: String,
        unique: true,
        sparse: true,
        lowercase: true,
        trim: true,
    },

    phone: {
        type: String,
        unique: true,
        sparse: true,
    },

    roles: {
        type: [String],
        default: ['user'],
    },

    isBan: {
        type: Boolean,
        default: false,
    },

    avatar: {
        type: String,
        default: null,
    },

    biography: {
        type: String,
        default: '',
        maxlength: 70,
    },

    password: {
        type: String,
        required: true,
    }

}, { timestamps: true });

const UserModel = models.User || model('User', userSchema);
module.exports = { UserModel };
export { UserModel };