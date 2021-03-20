/**
 * @description this code is for creating the child div elements for the parent div with the id "entryHolder".
 * @returns three new divs with new id attributes.
 */
const main = document.querySelector('body');

const entry = document.createElement('div');
const entryAtt = document.createAttribute('id');
entryAtt.value = 'entryHolder';
entry.setAttributeNode(entryAtt);

const childDivs = ["date", "temp", "content"];

for (let i = 0; i < childDivs.length; i++) {
    let newDiv = document.createElement('div');
    let newEntryAtt = document.createAttribute('id');
    newEntryAtt.value = childDivs[i];
    newDiv.setAttributeNode(newEntryAtt);
    newDiv.textContent = childDivs[i];
    entry.appendChild(newDiv);
}

main.appendChild(entry);

console.log(entry);

//api key for the weather
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=649b1be56004028c877a56b4fb684127";
const zipCode = document.getElementById("zip");
const country = ",us";
const unit = "&units=imperial";

//functions to the get the current date
let day = '';
//const year = date.getFullYear();
const currentDate = () => {
    const date = new Date();

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    day = (months[date.getMonth()] + " " + date.getDate() + "," + " " + date.getFullYear());
    return day;
}




document.getElementById("generate").addEventListener('click', newLocation);



function newLocation(e) {
    getWeather(baseURL, zipCode.value, country, apiKey, unit)
    currentDate()
    console.log(day);
    /*.then(function(data) {
         console.log(data);
         postData('/newZip', { date: data. })
     })*/

}

const getWeather = async(baseURL, loc, nation, key, farenheit) => {
    const res = await fetch(baseURL + loc + nation + key + farenheit)
    try {
        const data = await res.json();
        console.log(data);
        //return data
    } catch (error) {
        console.log("error", error);
    }
}

const postData = async(url = " ", data = {}) => {
    const response = await fetch(url, {
        method: 'Post',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log('error', error);
    }
}

console.log(day);