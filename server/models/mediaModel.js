import mongoose from "mongoose";
import populate from "mongoose-autopopulate";

const imageSchema = new mongoose.Schema( {
    enabled: {
        type: Boolean,
        default: true,
    },
    filename: {
        // Actual file name
        type: String,
        default: "",
    },
    title: {
        // Displayable name
        type: String,
        default: "",
    },
    tags: {
        type: [String],
        default: []
    },
    categories: {
        type: [String],
        default: []
    },
    path: {
        // File path or URL
        type: String,
        default: "",
    },
    uploader: {
        // User UUID that uploaded it
        type: String,
        default: "",
    },
    link: {
        // Any kind of external link that can be routed to when clicked on
        type: String,
        default: "",
    },
    contentType: {
        type: String,
    },
    size: {
        type: Number,
    },
    // Image Timestamps
    uploadedAt: {
        type: Date,
        default: Date.now,
    },
    modifiedAt: {
        type: Date,
        default: Date.now,
    },
});
imageSchema.plugin(populate);

const mediaSchema = new mongoose.Schema( {
    enabled: {
        type: Boolean,
        default: true,
    },
    filetype: {
        type: String
    },
    filename: {
        // Actual file name
        type: String,
        default: "",
    },
    title: {
        // Displayable name
        type: String,
        default: "",
    },
    contentType: {
        type: String,
    },
    size: {
        type: Number,
    },
    uploader: {
        // User UUID that uploaded it
        type: String,
        default: "",
    },
    path: {
        // File path or URL to where the file is actually stored on the server's uploads folder. 
        type: String,
        default: "",
    },
    link: {
        // Any kind of external link that can be routed to when clicked on
        type: String,
        default: "#",
    },
    tags: {
        type: [String],
        default: []
    },
    categories: {
        type: [String],
        default: []
    },
    base64URI: {
        type: String
    },
    // Image Timestamps
    uploadedAt: {
        type: Date,
        default: Date.now,
    },
    modifiedAt: {
        type: Date,
        default: Date.now,
    },
});
mediaSchema.plugin(populate);

export const Image = mongoose.model("images", imageSchema);
export const Media = mongoose.model("media", mediaSchema);

export default {
    Image, Media
};