const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    /// REQUIRED
    // MongoDB will insert a _id field.
    // _id: {
    //     type: Object,
    //     required: true,
    //     unique: true,
    // }
    username: {
        type: String,
        required: true,
        unique: true,
    },
    display_name: {
        type: String,
        required: true,
        unique: false,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        required: true,
        default: "guest",
    },
    /// REQUIRED BUT GENERATED
    token: {
        type: String,
    },
    /// OPTIONAL / SUPPLEMENTAL
    register_date: {
        type: Date,
        default: Date.now,
    },
    last_login: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("users", userSchema);
