
import express from 'express';
const router = express.Router();
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import User from "../models/userModel.js";

const jwt_expires = 1000 * 60 * 60 * 24 * 7; // = 60 * 60 * 24 * 7; // 1 week.
const debug = true;
const debugOut = (
    route,
    req = { req: "Not provided" },
    res = { res: "Not provided" },
    dataname = "",
    data = { data: "Not provided" },
) =>
{
    if ( debug )
        console.log(
            `userRoute.js :: ${ route.toString() } :: \nreq = `,
            req,
            "\nres = ",
            res,
            `\n${ dataname.toString() } = `,
            data,
        );
};

// @route       GET /api/users/auth/user
// @desc        Send a token and receive a user, if it matches any.
// @access      Private
// The auth middleware transforms the token sent in the request into a User object that has a parseable id.
const GetUser = async ( req, res ) =>
{
    if ( debug )
        console.log(
            "userRoute.js :: api/users/auth/user",
            // " :: req = ",
            // req.headers,
            " :: res.data = ",
            res.data,
            " :: res.user = ",
            res.user,
        );
    // User.findById( req.user.id ).select( '-password' ).then( ( user ) => res.json( user ) );
    User.findById( req.user.id )
        .select( "-password" )
        .then( ( user ) =>
        {
            if ( debug ) console.log( "res.status = ", res.status, ", user = ", user );
            // res.json(user);
            let authorized = [ "superadmin", "admin" ].includes( user.role.toString() );
            res.send( {
                user: {
                    id: user.id,
                    role: user.role,
                    token: user.token,
                    // auth: user.role === "admin",
                    auth: authorized,
                    username: user.username,
                    display_name: user.display_name,
                    email: user.email,
                    last_login: user.last_login,
                    register_date: user.register_date,
                },
                success: true,
                status: res.status,
                message: `User ${ authorized ? 'is' : 'is not' } authorized to enter admin areas`,
            } );
        } );
}

// @route       GET /api/users/
// @desc        Get all users
// @access      Private
const GetUsers = async ( req, res ) =>
{
    // Pull the data from every collection in the database.
    // if ( debug ) 
    //     console.log( "PortfolioRoute.js received get-portfolio-data request on:",
    //         req.headers.host,
    //         req.socket.localPort,
    //         req.socket.remotePort,
    //         req.socket.address,
    //         req.socket.remoteAddress,
    //         req.headers["access-control-allow-origin"]
    //     );
    try
    {
        const users = await User.find();
        // if ( debug ) console.log(
        //     users,
        // );

        // res.writeHead(200, {
        //     "Content-Type": "text/plain",
        //     "Access-Control-Allow-Origin": "*",
        //     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        // });
        res.status( 200 ).send( {
            users: users,
        } );
        // if ( debug ) console.log( "test" );
    } catch ( error )
    {
        res.status( 500 ).send( error );
    }
}

// /api/users/login
// @route       POST /api/users/login
// @desc        Compare provided credentials with users stored in the db. If there is a match, return true.
// @access      Private
const LoginUser = async ( req, res ) =>
{
    try
    {
        // Get a salted hash of the password.
        const user = await User.findOne( {
            username: req.body.username,
            password: req.body.password,
        } );

        // Blank out the password so it doesn't get saved in the localstorage token.
        user.password = "";
        debugOut( "/login", req.body, res.status, "user", user );
        if ( user )
        {
            // Success. Update the last_login field.
            // let token = generateTokenAndSetCookie( user._id, res );
            let token = jwt.sign(
                { id: user.id },
                process.env.JWT_SECRET,
                { expiresIn: `${jwt_expires}d` },
            );
            user.token = token;
            user.last_login = new Date();
            user.save();
    
            res.status( 200 ).send( {
                data: {
                    ...user,
                    password: ""
                },
                token: token,
                success: true,
                message: "Logged in successfully",
            } );
        } else
        {
            res.status( 401 ).send( {
                data: { ...user, password: "" },
                success: false,
                message: "Invalid username or password.",
            } );
        }
    } catch ( error )
    {
        res.status( 500 ).send( error );
    }
}

// @route       POST /api/users/signup
// @desc        Create a new user.
// @access      Private
const SignUpUser = async ( req, res ) =>
{
    // debug("/signup", req, res, "", {});
    const { username, email, password } = req.body;
    // Simple validation.
    if ( !username || !email || !password )
    {
        // return res.status( 400 ).json( { msg: 'Please enter all fields.' } );
        return res.status( 400 ).send( {
            data: req.body,
            success: false,
            message: "Please enter all fields.",
        } );
    }

    debugOut( "/signup", req.body, res.status, "" );
    // Check for existing user.
    User.findOne( { email } ).then( ( user ) =>
    {
        // If one is found, then this user already exists.
        if ( user )
        {
            if ( debug ) console.log( "/signup :: user already exists!" );
            // return res.status( 400 ).json( { msg: 'User already exists.' } );

            return res.status( 400 ).send( {
                data: req.body,
                success: false,
                message: "User already exists with this email address.",
            } );
        } else
        {
            // Create new user.
            const newUser = new User(
                // req.body
                {
                    username: req.body.username,
                    password: req.body.password,
                    display_name: req.body.display_name,
                    email: req.body.email,
                    role: `guest`,
                    register_date: new Date(),
                    last_login: new Date(),
                },
            );
            if ( debug )
                console.log(
                    "/signup :: user does not already exist :: Creating new user = ",
                    newUser,
                );

            // Create salt & hash.
            bcrypt.genSalt( 10, ( err, salt ) =>
            {
                bcrypt.hash( newUser.password, salt, ( err, hash ) =>
                {
                    if ( err ) throw err;

                    newUser.password = hash;

                    newUser.save().then( ( user ) =>
                    {
                        jwt.sign(
                            { id: user.id },
                            process.env.JWT_SECRET,
                            { expiresIn: `${jwt_expires}d` },
                            ( err, token ) =>
                            {
                                // Callback function.
                                if ( err ) throw err;

                                res.status( 200 ).send( {
                                    token: token,
                                    user: {
                                        id: user.id,
                                        username: user.username,
                                        display_name: user.display_name,
                                        email: user.email,
                                        role: user.role,
                                        last_login: user.last_login,
                                        register_date: user.register_date,
                                        token: token,
                                    },
                                    success: true,
                                    message:
                                        "Successfully signed up! Please sign in with your new credentials.",
                                } );

                                // Save the token to the new user.
                                user.token = token;
                                user.save();

                                res.cookie( "jwt", token, {
                                    httpOnly: true, // Not accessible via javascript or by the browser.
                                    maxAge: new Date( Date.now() + jwt_expires ), // 7 days
                                    sameSite: "strict", // CSRF
                                } );
                            },
                        );
                    } );
                } );
            } );
        }
    } );
}

// @route       POST /api/users/auth
// @desc        Authenticate a user.
// @access      Private
const AuthUser = async ( req, res ) =>
{
    const { username, password } = req.body;
    // Simple validation.
    if ( !username || !password )
    {
        // return res.status( 400 ).json( { msg: 'Please enter all fields.' } );
        return res.status( 400 ).send( {
            data: req.body,
            success: false,
            message: "Please enter all fields.",
        } );
    }
    debugOut( "/auth", req.body, res.status, "" );

    // Check for existing user.
    User.findOne( { username } ).then( ( user ) =>
    {
        // If one is found, then this user already exists.
        if ( !user )
        {
            if ( debug ) console.log( "/auth :: User does not exist." );

            return res.status( 401 ).send( {
                data: req.body,
                success: false,
                message: "Invalid credentials.",
            } );
        }

        // User exists; validate password.
        bcrypt.compare( password, user.password ).then( ( isMatch ) =>
        {
            if ( !isMatch )
            {
                return res.status( 401 ).send( {
                    data: req.body,
                    success: false,
                    message: "Invalid credentials.",
                } );
            }

            // Credentials are a match. Proceed with generating a jst and updating the token stored.
            jwt.sign(
                { id: user.id },
                process.env.JWT_SECRET,
                // { expiresIn: 3600 },
                { expiresIn: `${jwt_expires}d` },
                ( err, token ) =>
                {
                    // Callback function.
                    if ( err ) throw err;

                    user.token = token;
                    user.last_login = new Date();
                    user.save();
                    res.status( 200 ).send( {
                        token: token,
                        user: {
                            id: user.id,
                            username: user.username,
                            email: user.email,
                            role: user.role,
                            token: user.token,
                            display_name: user.display_name,
                            last_login: user.last_login,
                            register_date: user.register_date,
                        },
                        success: true,
                        message: "Successfully authenticated.",
                    } );

                    // Save the token to the new user.
                },
            );
        } );
    } );
}


export
{
    LoginUser,
    SignUpUser,
    GetUser,
    GetUsers,
    AuthUser
};