/**
 * @description this code is for creating the child div elements for the parent div with the id "entryHolder".
 * @returns three new divs with new id attributes.
 */
const main = document.querySelector('body');

const entry = document.createElement('div');
const entryAtt = document.createAttribute('id');
entryAtt.value = 'entryHolder';
entry.setAttributeNode(entryAtt);

const childDivs = ["date", "city", "weather_text", "temp", "weather", "content"];

for (let i = 0; i < childDivs.length; i++) {
    let newDiv = document.createElement('div');
    let newEntryAtt = document.createAttribute('id');
    newEntryAtt.value = childDivs[i];
    newDiv.setAttributeNode(newEntryAtt);
    entry.appendChild(newDiv);
}

main.appendChild(entry);

//different constants that are going to make up the content of the api request.
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=649b1be56004028c877a56b4fb684127";
const zipCode = document.getElementById("zip");
const country = ",us";
const unit = "&units=imperial";

// Three values that will be displayed when the user clicks the 'curent weather' button.
let day = '';
let currentTemp = '';
let city = '';
let weather = '';
let userText = '';

/**
 * @description this function is used to create the current date.
 * @returns current date.
 */
const currentDate = () => {
    const date = new Date();

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    day = (months[date.getMonth()] + " " + date.getDate() + "," + " " + date.getFullYear());
    return day;
}

/**
 * @description this function will be called, in order to extract the user's input from the text area.
 * @returns the value of the text area.
 */
const inputText = () => {
    const inputField = document.querySelector('textarea');
    userText = inputField.value;
}

/**
 * @description this is adding an event listener to the button.
 * @returns the date, input text, and current temperature.
 */
document.getElementById("generate").addEventListener('click', newLocation);

function newLocation(e) {
    getWeather(baseURL, zipCode.value, country, apiKey, unit)
        .then(currentDate())
        .then(inputText())
        .then(function(data) {
            postData("/newZip", { date: day, temp: data.main.temp, city: data.name, weather: data.weather[0].description, content: userText });
        })
        .then(takeAll)
        .then(clearPrevious())
}

/**
 * 
 * @param {string} baseURL 
 * @param {string} loc 
 * @param {string} nation 
 * @param {string} key 
 * @param {string} farenheit 
 * @description this function will return all of the weather data from openweathermap.com, as long as the user has put in a valid zip code.
 * @returns {json} all of the weather data from the api, openweathermap.com, if successful, otherwise there will be an alert.
 */
const getWeather = async(baseURL, loc, nation, key, farenheit) => {
    const res = await fetch(baseURL + loc + nation + key + farenheit)

    try {
        const data = await res.json();
        if (data.cod !== 200) {
            alert("Please insert a valid zip code.")
        } else {
            contentBackground('entryHolder');
            return data;
        }
    } catch (error) {
        console.log("error", error);
    }
}

/**
 * 
 * @param {string} url 
 * @param {object} data 
 * @description this is creating a post request to the server.
 */
const postData = async(url = "", data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    })

    try {
        const newData = await response.json();
    } catch (error) {
        console.log('error', error);
    }
}

/**
 * @description this code is going to take the most recently submitted data from the array that is storing all of the user data in the server "allData".
 * @returns an updated ui displaying the most recent input.
 */
const takeAll = async() => {
    const allUserData = await fetch("/all");

    try {
        const newData = await allUserData.json();

        document.getElementById('date').innerText = newData[newData.length - 1].date;

        document.getElementById('city').innerText = newData[newData.length - 1].city;

        document.getElementById('weather_text').innerText = "Current Weather";

        document.getElementById('temp').innerText = newData[newData.length - 1].temp + "°F";

        document.getElementById('weather').innerText = upperCase(newData[newData.length - 1].weather);

        document.getElementById('content').innerText = newData[newData.length - 1].content;

    } catch (error) {
        console.log("error", error);
    }
}

/**
 * @description this just clears all of the users previous input from the input fields.
 * @returns clear input forms.
 */
const clearPrevious = () => {
    document.getElementById('zip').value = "";
    document.getElementById('feelings').value = "";
}

/**
 * 
 * @param {*} string 
 * @description this function takes a string and capitalizes the first letter of each word.
 * @returns I used this for the current weather, it capitalizes the first letter of each word.
 */
const upperCase = (string) => {
    let newStr = [];
    let arrayOf = string.split(" ");

    for (var i = 0; i < arrayOf.length; i++) {

        let first = arrayOf[i][0].toString().toUpperCase().split('');

        let remainder = arrayOf[i].slice(1, arrayOf[i].length);

        newStr.push(first.concat(remainder).join(''));
    }

    return (newStr.join(' '));
}

//initializing the display of the entryHolder to 'none'.
document.getElementById('entryHolder').style.display = 'none';

/**
 * 
 * @param {*} displayId 
 * @description this will be added to the click event on the button with the id generate, and will turn the display from none to flex.
 * @returns a new display value of flex will be returned after supplying the elements id as a parameter. 
 */
const contentBackground = (displayId) => {
    displayId = document.getElementById(displayId);
    if (displayId.style.display === 'none') {
        displayId.style.display = 'flex';
    }
}