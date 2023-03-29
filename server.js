const path = require("path");
const express = require("express");
const dotenv = require("dotenv").config();
const dbConfig = require("./config/dbConfig");
const port = process.env.PORT || 4000;
// const cors = require( "cors" );
const { createProxyMiddleware } = require( "http-proxy-middleware" );

// Initialize the server.
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(
    cors({
        // origin: "localhost",
        origin: "*",
    }),
);

// Get portfolio route endpoint for getting data from the database.
// const portfolioRoute = require("./routes/portfolioRoute");
app.use( "/api/portfolio", require("./routes/portfolioRoute") );
app.use( "/api/users", require( "./routes/userRoute" ) );



// app.use( "/api/portfolio", createProxyMiddleware( { target: 'localhost', changeOrigin: true } ) );
// Set up measures to avoid CORS issues.
// const cors = require("cors");
// app.use(cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 }));
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept",
//     );
//     next();
// } );
// app.use((req, res, next) => {
//     res.append("Access-Control-Allow-Origin", ["*"]);
//     res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//     res.append("Access-Control-Allow-Headers", "Content-Type");
//     next();
// });
// app.use( "/api/portfolio", ( req, res, next ) =>
// {
//     console.log( res.header );
//     res.writeHead(200, {
//         "Content-Type": "text/plain",
//         "Access-Control-Allow-Origin": ["*"],
//         "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
//     });
//     next();
// });
// 
// Deployment environment variables.
if (process.env.NODE_ENV === "production") {
    // After building production folder ("build"), tell the server where the production environment files are.
    app.use(express.static(path.join(__dirname, "./client/build")));
    // app.get("*", (req, res) => {
    //     res.sendFile(
    //         path.join(__dirname, "./client/build/index.html"),
    //         // path.resolve(__dirname, "../", "client", "build", "index.html"),
    //     );
    // });
    app.get( "*", ( req, res ) =>
    {
        // console.log( `Server.js :: app.get(*) :: environment variables are currently: `, process.env, ", req = ", req, ", res = ", res, ", __dirname = ",  __dirname, );
        
        res.sendFile(
            path.resolve( __dirname, "./", "client", "build", "index.html" ),
        );
    });
} else {
    app.get( "/", ( req, res ) =>
    {
        // console.log( `Server.js :: app.get(//) :: environment variables are currently: `, process.env );
        res.send(
            `Server currently running in the "${process.env.NODE_ENV}" environment. Please set to "production"`,
        );
    });
}

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
    console.log(
        `Server.js :: app.listen(port, ()) :: environment variables are currently: `,
        // process.env,
        ", port = ",
        port,
        ", __dirname = ",
        __dirname,
    );
});

/*
const express = require( "express" );
const app = express();
require( "dotenv" ).config();
const dbConfig = require( "./config/dbConfig" );

// Get portfolio route endpoint for getting data from the database.
const portfolioRoute = require( "./routes/portfolioRoute" );
app.use( express.json() );
app.use( "/api/portfolio", portfolioRoute );

const port = process.env.PORT || 5000;

// Deployment environment variables.
const path = require( "path" );
if ( process.env.NODE_ENV === "production" ) {
    // After building production folder ("build"), tell the server where the production environment files are.
    app.use( express.static( path.join( __dirname, "client/build" ) ) );
    app.get("*", (req, res) => {
        res.sendFile( path.join( __dirname, "client/build/index.html" ) );
    });
}

app.listen( port, () => {
    console.log( `Server running on port ${port}.` );
} );
*/