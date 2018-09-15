//Get the DOM elements

let arrow = document.querySelector(".arrow");
let searchDiv = document.querySelector(".city-search");
// Get the city name
const cityName = document.querySelector(".city-name");
// get a reference to the select field
const lang = document.querySelector("#language");
const unit = document.querySelector("#unit");
// Get the settings button
const param = document.querySelector(".param");
// Get the parameter Div
const setting = document.querySelector(".setting");
//Get the save and cancel button
const btn = document.querySelectorAll("button");
//Get the main element
const mainTag = document.querySelector("main");
//Get the input field
const inputSearch = document.querySelector("#inputSearch");
//Get the search form
const searchForm = document.querySelector("form");



//Arrays of week days
const weekDays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
//Set a configuration Object
let configuration = {
  lan: "en",
  temp: "imperial"
};
// Define an array to store the configuration in local storage
let parameters = [];
parameters.push(configuration);
// initial configuration setting in local storage
localStorage.setItem('config', JSON.stringify(parameters));



arrow.addEventListener("click", toggleSearchBar);

function toggleSearchBar(e) {
  if (e.target.classList.contains("arrow-down")) {
    searchDiv.classList.add("show");
    arrow.firstElementChild.innerHTML = `<i class="fas fa-angle-up arrow-up"></i>`;
    cityName.firstElementChild.style.fontSize = "0.7rem";
  }
  if (e.target.classList.contains("arrow-up")) {
    searchDiv.classList.remove("show");
    arrow.firstElementChild.innerHTML = `<i class="fas fa-angle-down arrow-down"></i>`;
    cityName.firstElementChild.style.fontSize = "1.3rem";
  }
}


param.addEventListener("click", openSettings);


function openSettings() {
  setting.classList.add("displaySettings");
}



btn[1].addEventListener("click", closeSettings);
btn[0].addEventListener("click", saveSettings);
btn[0].addEventListener("click", closeSettings);

function closeSettings() {
  setting.classList.remove("displaySettings");

}

function saveSettings() {

  // Get the configuration from local storage
  parameters = JSON.parse(localStorage.getItem('config'));
  // Change the language and the unit of temperature according to the user choice
  parameters[0].lan = lang.value;
  parameters[0].temp = unit.value;
  //Save the new values in the local storage
  localStorage.setItem('config', JSON.stringify(parameters));

}
//Call the API
function callTheApi(e) {

  let unit = JSON.parse(localStorage.getItem('config'))[0].temp;
  let lan = JSON.parse(localStorage.getItem('config'))[0].lan;
  let key = "6f82f2d2ceb2aa8ec59653c8cd278915";
  let nameOfCity = inputSearch.value.trim();
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${nameOfCity}&units=${unit}&lang=${lan}&APPID=${key}`;
  // Check if the user entered something
  e.preventDefault();
  if (nameOfCity == "") {
    alert("Please, Enter a City name");
  }
  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data);
    });
}
//todo http://api.openweathermap.org/data/2.5/weather?q=
//todo var date = new Date(1313564400000);

//!var d = new Date();
//!var n = d.getUTCDay();  from 0 to 6   0 =sunday

//  function myFunction() {
//  var d = new Date();
//  var n = d.getUTCDate(); from 1 to 31
//}
searchForm.addEventListener("submit", callTheApi);