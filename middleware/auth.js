const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// For any routes we want to be private, such as admin-only routing functionality in the backend like add or remove or edit users, then we use this to confirm that the user is logged in and authorized. 
function auth ( req, res, next )
{
    // Fetch the token from the header.
    const token = req.header( 'x-auth-token' );
    console.log(
        "auth.js :: auth",
        // " :: req = ",
        // req,
        // " :: res = ",
        // res,
        " :: token = ",
        token,
    );
    // Check for token.
    if ( !token )
    {
        console.log(
            "auth.js :: auth",
            // " :: req = ",
            // req,
            // " :: res = ",
            // res,
            " :: token = ",
            token,
            " :: 401 :: No Token, authorization denied.",
        );
        return res.status(401).send({
            data: token,
            success: false,
            message: "No Token, authorization denied.",
        });
    }

    try
    {
        // Token was defined / not null; verify it.
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Add user from payload.
        console.log(
            "auth.js :: auth",
            // " :: req = ",
            // req,
            // " :: res = ",
            // res,
            "\n\n :: token = ",
            token,
            "\n\n :: decoded = ", 
            decoded, " :: req.user = ", req.user,
            "\n\n :: 200 :: Token provided was valid!",
        );
        req.user = decoded;
        res.status = 200;
        next();
    } catch ( e )
    {
        console.log(
            "auth.js :: auth",
            // " :: req = ",
            // req,
            // " :: res = ",
            // res,
            "\n\n :: token = ",
            token,
            "\n\n :: (e) = ",
            e,
            "\n\n :: 400 :: Token provided but was invalid.",
        );
        return res.status(400).send({
            data: e,
            success: false,
            status: 400,
            message: "Invalid Token",
        });
    }
}

module.exports = auth;