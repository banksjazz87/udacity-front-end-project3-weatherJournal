const port = 6600;

const express = require("express");
const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const cors = require("cors");
app.use(cors());

app.use(express.static('website'));

app.use(function(req, res) {
    res.setHeader("Content-Type", "text/plain");
    res.write('you posted:\n')
    res.end(JSON.stringify)
})
app.get("/", (req, res) => {
    res.send("Hello World");
});

const server = app.listen(port, listening);

function listening() {
    console.log("server running");
    console.log(`running on localhost: ${port}`);
}

const inputData = [];

app.get('/website', function(req, res) {
    res.send('Hello World');
})