const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
    name: { type: String, required: true, minLength: 3, maxLength: 20 },
    lastName: { type: String, default: '', maxLength: 20 },
    username: { type: String, required: true, minLength: 3, maxLength: 20, unique: true },
    phone: { type: String, required: true, unique: true },
    avatar: { type: String || null, required: false },
    biography: { type: String, default: '', maxLength: 70 },
    password: { type: String, required: true },
}, { timestamps: true })

const UserModel = mongoose.models.User || mongoose.model('User', schema);
module.exports = UserModel;