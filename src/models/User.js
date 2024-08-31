const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_id: { type: String },
    password: { type: String },
    name : { type: String },
    email: { type: String },
    user_role: { type: String },
    phone: { type: String },
});

module.exports = mongoose.model("users", userSchema);