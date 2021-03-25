const port = 6600;

const express = require("express");
const app = express();

//const bodyParser = require("body-parser");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const cors = require("cors");
app.use(cors());

app.use(express.static('website'));

/*app.use(function(req, res) {
    res.setHeader("Content-Type", "text/plain")
    res.write(`you posted:\n`)
    res.end(JSON.stringify(req.body, null, 2))
})*/

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
    res.send(projecData)
    console.log(projectData);
}



//This is the route made for the post
app.post("/newZip", newZip);

function newZip(req, res) {
    console.log(req.body);
    /*projectData = {
         date: req.body.date,
         temp: req.body.temp,
         content: req.body.content
     }

     allData.push(projectData)
     res.send(allData);
    //console.log('cat');*/
}