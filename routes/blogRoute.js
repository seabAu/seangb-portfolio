const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const axios = require("axios");

const {
    Blog,
    Post,
    Comment,
} = require("../models/blogModel");

const debug = (
    route,
    req = { req: "Not provided" },
    res = { res: "Not provided" },
    dataname = "",
    data = { data: "Not provided" },
) => {
    console.log(
        `userRoute.js :: ${route.toString()} :: \nreq = `,
        req,
        "\nres = ",
        res,
        `\n${dataname.toString()} = `,
        data,
    );
};

// * Blog & Config * //

// @route       GET /api/blog/
// @desc        Get all blog related data.
// @access      Private
router.get("/", async (req, res) => {
    try {
        // Blog contains all the overall config for the blog, like categories and tags.
        const blog = await Blog.find();
        const posts = await Post.find();
        const comments = await Comment.find();
        res.status(200).send({
            blog: blog[0],
            posts: posts,
            comments: comments,
        });
        // console.log( "test" );
    } catch (error) {
        res.status(500).send(error);
    }
});

// @route       GET /api/blog/categories
// @desc        Get all blog categories
// @access      Public
router.get( "/categories", async ( req, res ) =>
{
    
});

// @route       GET /api/blog/tags
// @desc        Get all blog tags
// @access      Public
router.get( "/tags", async ( req, res ) =>
{
    
});

// @route       GET /api/blog/filters
// @desc        Get all blog filters
// @access      Public
router.get( "/filters", async ( req, res ) =>
{
    
});

// * Posts * //
// @route       GET /api/blog/posts
// @desc        Get all posts
// @access      Public
router.get("/posts", async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).send({
            posts: posts,
        });
        // console.log( "test" );
    } catch (error) {
        res.status(500).send(error);
    }
});

// @route       POST /api/blog/add-post
// @desc        Create a new post
// @access      Private
router.post( "/add-post", auth, async ( req, res ) => {
    try {
        const post = new Post( req.body );
        await post.save();

        // If it works, throw a success message.
        res.send( {
            data: post,
            success: true,
            message: "Post added successfully",
            status: 200,
        } );
    } catch ( error ) {
        // res.status(500).send(error);

        res.send( {
            data: error,
            success: false,
            message: "500 Error.",
            status: 500,
        } );
    }
} );


// @route       POST /api/blog/edit-post
// @desc        Edit a post
// @access      Private
router.post( "/edit-post", auth, async ( req, res ) => {
    try {
        const post = await Post.findOneAndUpdate( {
                _id: req.body._id
            },
            req.body, {
                new: true
            },
        );
        res.send( {
            data: post,
            success: true,
            message: "Post updated successfully.",
            status: 200,
        } );
    } catch ( error ) {
        // res.status(500).send(error);

        res.send( {
            data: error,
            success: false,
            message: "500 Error.",
            status: 500,
        } );
    }
} );

module.exports = router;
