import app from './config/routerConfig.js';
import path from "path";
import dotenv from 'dotenv';
dotenv.config();

const __dirname = path.resolve();

// Connect database.
import connectDB from './config/dbConfig.js';
connectDB();

if ( process.env.DEBUG === true ) console.log( "DB URL: ", process.env.mongo_url );

const port = process.env.PORT || 4000;
const debug = process.env.DEBUG;

// ROUTES
import portfolioRoute from "./routes/portfolioRoute.js";
import userRoute from "./routes/userRoute.js";
import blogRoute from "./routes/blogRoute.js";
import appsRoute from "./routes/appsRoute.js";
import schemaRoute from "./routes/schemaRoute.js";
import mediaRoute from "./routes/mediaRoute.js";
// Get portfolio route endpoint for getting data from the database.
app.use( "/api/portfolio", portfolioRoute );
app.use( "/api/users", userRoute );
app.use( "/api/blog", blogRoute );
app.use( "/api/apps", appsRoute );
app.use( "/api/schema", schemaRoute );
app.use( "/api/media", mediaRoute );

if ( process.env.DEBUG === true ) {
    console.log( `Server.js :: Development :: app.get(//) :: environment variables are currently: `,
        ", __dirname = ",
        __dirname,
        "\n\n ** NODE_ENV = ",
        process.env,
        "\n\n ** PORT = ",
        process.env.PORT,
        "\n\n ** HOST = ",
        process.env.HOST,
        "\n\n ** BASE_URL = ",
        process.env.BASE_URL
    );
}

// Deployment environment variables.
if ( process.env.NODE_ENV === "production" ) {
    // After building production folder ("build"), tell the server where the production environment files are.

    const deployPath = path.resolve(
        __dirname,
        // "../",
        // "../",
        // "html",
        // "seangb-portfolio",
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

    app.get( "*", ( req, res ) => {
        if ( process.env.DEBUG === true )
            console.log(
                `Server.js :: app.get(*) :: Production :: environment variables are currently: `,
                //process.env,
                ", __dirname = ",
                __dirname,
                ", NODE_ENV = ",
                process.env.NODE_ENV,
                ", PORT = ",
                process.env.PORT,
                ", HOST = ",
                process.env.HOST,
                ", BASE_URL = ",
                process.env.BASE_URL,
                // ", express.static use path = ",
                // usepath,
                // ", send path = ",
                // sendpath,
            );

        res.sendFile( sendpath );
        // res.sendFile( path.join( __dirname, "../../html/seangb_portfolio/client/build/index.html" ) );
    } );
} else {
    app.get( "/", ( req, res ) => {
        if ( process.env.DEBUG === true ) console.log( `Server.js :: Development :: app.get(//) :: environment variables are currently: `,
            ", __dirname = ",
            __dirname,
            "\n\n, NODE_ENV = ",
            process.env,
            "\n\n, PORT = ",
            process.env.PORT,
            "\n\n, HOST = ",
            process.env.HOST,
            "\n\n, BASE_URL = ",
            process.env.BASE_URL,
        );
        res.send(
            `Server currently running in the "${ process.env.NODE_ENV }" environment. Please set to "production"`,
        );
    } );
}

app.listen( port, () => {
    console.log( `Server running on port ${ port }.` );
    if ( process.env.DEBUG === true )
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