import mongoose from "mongoose";
import populate from "mongoose-autopopulate";

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
userSchema.plugin(populate);

const userProfileSchema = mongoose.Schema({
    userid: {
        type: String,
    },
    firstname: {
        type: String,
        default: "",
    },
    tags: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tag",
        },
    ],
} );
userProfileSchema.plugin(populate);

// module.exports = mongoose.model("users", userSchema);
export const User = mongoose.model( "users", userSchema );

export default User;
