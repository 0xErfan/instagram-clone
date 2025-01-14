const { Schema, models, model } = require('mongoose');

const schema = new Schema({
    fullname: { type: String, required: true, minLength: 3, maxLength: 20 },
    username: { type: String, required: true, minLength: 3, maxLength: 20, unique: true },
    email: { type: String, default: undefined },
    phone: { type: String, required: true, unique: true },
    roles: { type: [String], default: ['user'] },
    isBan: { type: Boolean, default: false },
    avatar: { type: String || null, required: false },
    biography: { type: String, default: '', maxLength: 70 },
    password: { type: String, required: true },
}, { timestamps: true })

const UserModel = models.User || model('User', schema)
module.exports = { UserModel: models.User || model('User', schema) };
export { UserModel }