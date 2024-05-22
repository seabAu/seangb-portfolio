// const path = require( "path" );
// const express = require( "express" );
// const dotenv = require( "dotenv" ).config();
// const dbConfig = require( "./config/dbConfig" );
import path from "path";
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const __dirname = path.resolve();

// Connect database.
import connectDB from './config/dbConfig.js';
connectDB();

console.log( "DB URL: ", process.env.mongo_url );


const port = process.env.PORT || 4000;
// const { createProxyMiddleware } = require( "http-proxy-middleware" );
import { createProxyMiddleware } from "http-proxy-middleware";

// Initialize the server.
const app = express();
<<<<<<< HEAD
const cors = require("cors");
app.use(express.json());
// app.use(cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 }));
=======
// const cors = require( "cors" );
import cors from 'cors';
app.use( express.json() );
>>>>>>> ba70c49 (Upgrades and updates)
app.use(
    cors( {
        // origin: "localhost",
        origin: "*",
    } ),
);

// ROUTES
import portfolioRoute from "./routes/portfolioRoute.js";
import userRoute from "./routes/userRoute.js";
import blogRoute from "./routes/blogRoute.js";
import appsRoute from "./routes/appsRoute.js";
import schemaRoute from "./routes/schemaRoute.js";
// Get portfolio route endpoint for getting data from the database.
app.use( "/api/portfolio", portfolioRoute );
app.use( "/api/users", userRoute );
app.use( "/api/blog", blogRoute );
app.use( "/api/apps", appsRoute );
app.use( "/api/schema", schemaRoute );

// Deployment environment variables.
if ( process.env.NODE_ENV === "production" ) {
    // After building production folder ("build"), tell the server where the production environment files are.

    const deployPath = path.resolve(
        __dirname,
        "./",
        "client",
        "build",
    );

    // let usepath = path.resolve(deployPath, "/");
    let usepath = path.join( deployPath, "/" );
    let sendpath = path.resolve( deployPath, "index.html" );
    if ( process.env.DEBUG ) console.log(
        `Server.js :: Production :: Environment variables are currently: `,
        ", __dirname = ",
        __dirname,
        ", express.static use path = ",
        usepath,
        ", send path = ",
        sendpath,
    );

    app.use( express.static( usepath ) );

<<<<<<< HEAD
    app.get("*", (req, res) => {
        res.sendFile(sendpath);
    });
=======
    app.get( "*", ( req, res ) => {
        if ( process.env.DEBUG )
            console.log(
                `Server.js :: app.get(*) :: Production :: environment variables are currently: `,
                //process.env,
                ", __dirname = ",
                __dirname,
                ", NODE_ENV = ",
                process.env.NODE_ENV,
                ", PORT = ",
                process.env.PORT,
                // ", req = ",
                // req,
                // ", res = ",
                // res,
                // ", express.static use path = ",
                // usepath,
                // ", send path = ",
                // sendpath,
            );

        res.sendFile( sendpath );
        // res.sendFile( path.join( __dirname, "../../html/seangb_portfolio/client/build/index.html" ) );
    } );
>>>>>>> ba70c49 (Upgrades and updates)
} else {
    app.get( "/", ( req, res ) => {
        if ( process.env.DEBUG ) console.log( `Server.js :: Development :: app.get(//) :: environment variables are currently: `,
        //process.env,
        ", __dirname = ",
        __dirname,
        ", NODE_ENV = ",
        process.env.NODE_ENV,
        ", PORT = ",
            process.env.PORT
        );
        res.send(
            `Server currently running in the "${process.env.NODE_ENV}" environment. Please set to "production"`,
        );
    } );
}

<<<<<<< HEAD
app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});
=======
app.listen( port, () => {
    console.log( `Server running on port ${port}.` );
    if ( process.env.DEBUG )
        console.log(
            `Server.js :: app.listen(port, ()) :: environment variables are currently: `,
            //process.env,
            ", NODE_ENV = ",
            process.env.NODE_ENV,
            ", PORT = ",
            process.env.PORT,
            ", __dirname = ",
            __dirname,
        );
} );
>>>>>>> ba70c49 (Upgrades and updates)

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
