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

// Three values that will be displayed when the user clicks the 'curent weather' button.
let day = '';
let currentTemp = '';
let userText = '';

//function to the get the current date
const currentDate = () => {
    const date = new Date();

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    day = (months[date.getMonth()] + " " + date.getDate() + "," + " " + date.getFullYear());
    //return day;
    console.log(day);
}

//function to get the user's text input
const inputText = () => {
    const inputField = document.querySelector('textarea');
    userText = inputField.value;
    console.log(userText);
}




document.getElementById("generate").addEventListener('click', newLocation);



function newLocation(e) {
    getWeather(baseURL, zipCode.value, country, apiKey, unit)
    currentDate()
    inputText()
        /*.then(function(data){}
             console.log(data);
             postData('/newZip', { date: day, temp: currentTemp, content: userText })
         })*/

}

const getWeather = async(baseURL, loc, nation, key, farenheit) => {
    const res = await fetch(baseURL + loc + nation + key + farenheit)
    try {
        const data = await res.json();
        console.log(data);
        currentTemp = data.main.temp;
        console.log(currentTemp);
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