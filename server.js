const port = 6600;

const express = require("express");
const app = express();

//*** bodyParser is no longer needed with this version of express.js ***

//*const bodyParser = require("body-parser")

//this is the bodyparser that is included in the current version of express.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const cors = require("cors");
app.use(cors());

//using the contents of the folder 'website' to create a static server.
app.use(express.static('website'));

/**
 * @details determines if the port is working correctly.
 * @returns sends two console.log statements to the terminal to confirm that the server is working.
 */
const server = app.listen(port, listening);

function listening() {
    console.log("server is running");
    console.log(`running on localhost: ${port}`);
}

//an empty object to collect the current user input.
let projectData = {};

//an empty array to collect all of the user's input.
let allData = [];

//This is the route made for the post
app.post("/newZip", newZip);


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @details takes information from the req.body and places it into the empty array, that is used for collecting all of the user input.
 * @returns an updated array of the user's input, and then logs the updated array to the node terminal.
 */
function newZip(req, res) {
    projectData = {
        date: req.body.date,
        temp: req.body.temp,
        city: req.body.city,
        weather: req.body.weather,
        content: req.body.content
    }

    allData.push(projectData);
    res.send(projectData)
    console.log(allData);
}

//This is the route used to retrieve all of the data that has been submitted.
app.get("/all", sendAll);

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @details this sends the array with all of the user input to the client-side.
 * @returns sends all of the user's input to the client side.
 */
function sendAll(req, res) {
    res.send(allData);
}