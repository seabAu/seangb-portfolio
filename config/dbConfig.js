const mongoose = require( 'mongoose' );
mongoose.connect( process.env.mongo_url, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    //useCreateIndex: true,
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