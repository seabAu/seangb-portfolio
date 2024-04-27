const path = require("path");
const express = require("express");
const dotenv = require("dotenv").config();
const dbConfig = require("./config/dbConfig");
const port = process.env.PORT || 4000;
// const cors = require( "cors" );
const { createProxyMiddleware } = require("http-proxy-middleware");

// Initialize the server.
const app = express();
const cors = require("cors");
app.use(express.json());
// app.use(cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 }));
app.use(
    cors({
        // origin: "localhost",
        origin: "*",
    }),
);
// Get portfolio route endpoint for getting data from the database.
app.use("/api/portfolio", require("./routes/portfolioRoute"));
app.use("/api/users", require("./routes/userRoute"));
app.use("/api/blog", require("./routes/blogRoute"));
app.use("/api/apps", require("./routes/appsRoute"));
app.use("/api/schema", require("./routes/schemaRoute"));

// Deployment environment variables.
if (process.env.NODE_ENV === "production") {
    // After building production folder ("build"), tell the server where the production environment files are.

    const deployPath = path.resolve(
        __dirname,
        "./",
        "client",
        "build",
    );

    // let usepath = path.resolve(deployPath, "/");
    let usepath = path.join(deployPath, "/");
    let sendpath = path.resolve(deployPath, "index.html");
    if ( process.env.DEBUG ) console.log(
        `Server.js :: Production :: Environment variables are currently: `,
        ", __dirname = ",
        __dirname,
        ", express.static use path = ",
        usepath,
        ", send path = ",
        sendpath,
    );

    app.use(express.static(usepath));

    app.get("*", (req, res) => {
        res.sendFile(sendpath);
    });
} else {
    app.get("/", (req, res) => {
        if (process.env.DEBUG) console.log(`Server.js :: app.get(//) :: environment variables are currently: `, process.env);
        res.send(
            `Server currently running in the "${process.env.NODE_ENV}" environment. Please set to "production"`,
        );
    });
}

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
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
