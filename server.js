const http = require('http');
const port = 8000;
const express = require("express");
const app = express();
const cors = require("cors");

app.get("/", (req, res) => {
    res.send("Hello World");
});

const server = app.listen(port, listening);

function listening() {
    console.log("server running");
    console.log(`running on localhost: ${port}`);
}