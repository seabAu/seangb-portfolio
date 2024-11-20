import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.set( 'strictQuery', false );
        const conn = await mongoose.connect( process.env.mongo_url, {
            // To avoid warnings in the console
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useCreateIndex: true,
        } );
        console.log( `DB Connected: ${ conn.connection.host }` );

        // Now verify the connection.
        conn.connection.on( "error", () => {
            console.log( "Error connecting to MongoDB database." );
        } );
        conn.connection.on( "connected", () => {
            console.log( "Successfully connected to MongoDB database." );
        } );
    } catch ( error ) {
        console.error( `Error: ${ error.message }` );
        process.exit( 1 );
    }
};

export default connectDB;

/*
const mongoose = require( 'mongoose' );
mongoose.connect( process.env.mongo_url, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true,
} );

const connection = mongoose.connection;

// Now verify the connection.
connection.on("error", () => {
    console.log("Error connecting to MongoDB database.");
});
connection.on("connected", () => {
    console.log("Successfully connected to MongoDB database.");
} );

module.exports = mongoose;
*/