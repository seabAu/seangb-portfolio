
import express from 'express';
const router = express.Router();
import auth from "../middleware/auth.js";

import * as C from "../controllers/userController.js";

// @route       GET /api/users/
// @desc        Get all users
// @access      Private
router.get( "/", C.GetUsers );

// /api/users/login
// @route       POST /api/users/login
// @desc        Compare provided credentials with users stored in the db. If there is a match, return true.
// @access      Private
router.post( "/login", C.LoginUser );

// @route       POST /api/users/signup
// @desc        Create a new user.
// @access      Private
router.post( "/signup", C.SignUpUser );

// @route       POST /api/users/auth
// @desc        Authenticate a user.
// @access      Private
router.post( "/auth", C.AuthUser );

// @route       GET /api/users/auth/user
// @desc        Send a token and receive a user, if it matches any.
// @access      Private
// The auth middleware transforms the token sent in the request into a User object that has a parseable id.
router.get( "/auth/user", auth, C.GetUser );

export default router;