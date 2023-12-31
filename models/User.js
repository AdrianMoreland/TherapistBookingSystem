//models/users.js
const {Schema, model} = require("../db/connection") // import Schema & model

// User Schema
const UserSchema = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true }
});

// User model
const User = model("User", UserSchema)

module.exports = User