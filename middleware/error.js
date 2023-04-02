// const express = require("express");
// const app = express();
// const router = express.Router();
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});
// error handler
app.use((err, req, res, next) => {
    res.status(400).send(err.message);
});
