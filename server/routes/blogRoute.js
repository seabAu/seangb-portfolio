import express from 'express';
const router = express.Router();
import auth from "../middleware/auth.js";
import * as C from "../controllers/blogController.js";

import {
    Blog,
    Post,
    Comment,
} from "../models/blogModel.js";

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
router.get( "/", C.GetBlog );

// @route       GET /api/blog/categories
// @desc        Get all blog categories
// @access      Public
router.get( "/categories", C.GetCategories );

// @route       GET /api/blog/tags
// @desc        Get all blog tags
// @access      Public
router.get( "/tags", C.GetTags );

// @route       GET /api/blog/filters
// @desc        Get all blog filters
// @access      Public
router.get( "/filters", C.GetFilters );

// * Posts * //
// @route       GET /api/blog/posts
// @desc        Get all posts
// @access      Public
router.get( "/posts", C.GetPosts );

// @route       POST /api/blog/add-post
// @desc        Create a new post
// @access      Private
router.post( "/add-post", auth, C.AddPost );

// @route       POST /api/blog/edit-post
// @desc        Edit a post
// @access      Private
router.post( "/edit-post", auth, C.EditPost );


// module.exports = router;
export default router;
