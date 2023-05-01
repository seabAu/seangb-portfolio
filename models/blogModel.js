const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    categories: {
        type: [String],
        default: [],
    },
    tags: {
        type: [String],
        default: [],
    },
    filters: {
        type: Array,
        default: [],
    },
});
blogSchema.plugin(require("mongoose-autopopulate"));

const imageSchema = new mongoose.Schema({
    label: {
        type: String,
        default: "",
    },
    url: {
        type: String,
        default: "",
    },
    link: {
        type: String,
        default: "",
    },
});
imageSchema.plugin(require("mongoose-autopopulate"));

const postSchema = new mongoose.Schema({
    // Post content
    author: {
        type: String,
        default: "",
    },
    title: {
        type: String,
        default: "",
    },
    imageUrl: {
        type: String,
        default: "", // Put a default image url here.
    },
    imageLink: {
        type: String,
        default: "", // Put a default image url here.
    },
    content: {
        type: Array,
        default: "",
    },
    // content_type: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: Tags,
    // },
    // Post Timestamps
    timestampPosted: {
        type: Date,
        default: Date.now,
    },
    timestampUpdated: {
        type: Date,
        default: Date.now,
    },
    // valid_until: {
    //     type: Date,
    // },
    // Allows for customized styling for specific posts, if provided.
    options: {
        type: [String],
        default: [],
    },
    // Post categorization
    // topic: {
    //     type: String,
    //     required: true,
    // },
    categories: {
        type: [String],
        default: [],
    },
    tags: {
        type: [String],
        default: [],
    },
    // Post Interactions
    views: {
        type: Number,
        default: 0,
        min: 0,
    },
    comments: {
        type: [String],
        default: [],
    },
    likes: {
        type: Number,
        default: 0,
        min: 0,
    },
    dislikes: {
        type: Number,
        default: 0,
        min: 0,
    },
});
postSchema.plugin(require("mongoose-autopopulate"));

const commentSchema = new mongoose.Schema({
    postId: {
        type: Number,
        default: 0,
    },
    author: {
        type: String,
        default: "",
    },
    subject: {
        type: String,
    },
    title: {
        type: String,
        default: "",
    },
    content: {
        type: String,
        default: "",
    },
    // Nested comments.
    comments: {
        // type: [replySchema],
        type: Array,
        default: [],
    },
    likes: {
        type: Number,
        default: 0,
        min: 0,
    },
    dislikes: {
        type: Number,
        default: 0,
        min: 0,
    },
});
commentSchema.plugin(require("mongoose-autopopulate"));

/*

const commentSchema = new mongoose.Schema({
  text: String,
  discussion:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    username: 'String',
    avatar: {
      image: String,
      imageId: String,
    },
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  dislikes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
});

*/

const interactSchema = new mongoose.Schema({
    // Nested comments.
    comments: {
        // type: [replySchema],
        type: Array,
        default: [],
    },
    likes: {
        type: Number,
        default: 0,
        min: 0,
    },
    dislikes: {
        type: Number,
        default: 0,
        min: 0,
    },
});
interactSchema.plugin(require("mongoose-autopopulate"));

module.exports = {
    Blog: mongoose.model("blog", blogSchema),
    Post: mongoose.model("posts", postSchema),
    Comment: mongoose.model("comments", commentSchema),
};