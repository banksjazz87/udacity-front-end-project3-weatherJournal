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
    //res.write('you posted \n')
    res.end(JSON.stringify)
})

const server = app.listen(port, listening);

function listening() {
    console.log("server is running");
    console.log(`running on localhost: ${port}`);
}

let projectData = {};
let allData = [];

//This is the route made for the post
app.post("/newZip", newZip);

function newZip(req, res) {
    projectData = {
        date: req.body.date,
        temp: req.body.temp,
        content: req.body.content
    }

    allData.push(projectData)
    res.send(allData)
}