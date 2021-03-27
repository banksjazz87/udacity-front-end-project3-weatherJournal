const port = 6600;

const express = require("express");
const app = express();

// bodyParser is no longer needed with this version of express.js

//const bodyParser = require("body-parser");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const cors = require("cors");
app.use(cors());

app.use(express.static('website'));


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
        city: req.body.city,
        sky: req.body.sky,
        content: req.body.content
    }

    allData.unshift(projectData);
    res.send(projectData)
    console.log(allData);
}

//This is the route used to retrieve all of the data that has been submitted.

app.get("/all", sendAll);

function sendAll(req, res) {
    res.send(allData);
}