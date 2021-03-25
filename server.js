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

let projectData = {
    date: "poop",
    temp: "fart",
    content: "hello"
};
let allData = [];
//This is the data collected from the original API call
app.get('/https://api.openweathermap.org/data/2.5/weather?zi…d=649b1be56004028c877a56b4fb684127&units=imperial', currentData);

function currentData() {
    res.send(projectData)
    console.log(projectData);
}



//This is the route made for the post
app.post("/newZip", newZip);

function newZip(req, res) {
    projectData = {
        date: req.body.date,
        temp: req.body.temp,
        content: req.body.content
    }

    allData.push(projectData);
    res.send(projectData)
        //res.send(allData);
        //console.log(allData);
}

//This is the route used to retrieve all of the data that has been submitted.

app.get("/all", sendAll);

function sendAll(req, res) {
    res.send(allData);
}