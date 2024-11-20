// Initialize the server.
import express from 'express';
const app = express();

// Router configuration
import cors from 'cors';
app.use( express.json() );

app.use( express.static( 'uploads' ) );

// Set up measures to avoid CORS issues.
// const { createProxyMiddleware } = require( "http-proxy-middleware" );
import { createProxyMiddleware } from "http-proxy-middleware";
// app.use( "/api/portfolio", createProxyMiddleware( { target: 'localhost', changeOrigin: true } ) );

app.use(
    cors( {
        // origin: "localhost",
        // origin: "http://localhost:3000",
        // optionsSuccessStatus: 200,
        origin: "*",
    } ),
);

// // Set up headers with router.
// app.use((req, res, next) => {
//     res.append("Access-Control-Allow-Origin", ["*"]);
//     res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//     res.append( "Access-Control-Allow-Headers", "Content-Type" );
//     // res.header(
//     //     "Access-Control-Allow-Headers",
//     //     "Origin, X-Requested-With, Content-Type, Accept",
//     // );
//     next();
// } );

export default app;
