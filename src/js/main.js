//Get the DOM elements

//Get the arrow-down sign
let arrow = document.querySelector(".arrow");

let searchDiv = document.querySelector(".city-search");

// Get the city name
const cityName = document.querySelector(".city-name");

// get a reference to the select fields
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

//Get the current section
const currentSection = document.querySelector(".current");

//Get the city name div content ("h3")
const cityAndCountry = document.querySelector("#cityNameAndCountryName");

// Get the update sign
const spin = document.querySelector(".spin");

//Get the h6 that diaplay the time of updating
const lastUpdate = document.querySelector("#update-time");

//Arrays of week days
const weekDays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

//Arrays of months
const months = [
  "jan",
  "fev",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec"
];

//Set a configuration Object
let configuration = {
  lan: "en",
  temp: "imperial"
};
// Define an array to store the configuration in local storage
let parameters = [];

// initial configuration setting in local storage
if (localStorage.getItem("config") == null) {
  parameters.push(configuration);
  localStorage.setItem("config", JSON.stringify(parameters));
}

// animate the sync icon
spin.addEventListener("click", animateSync);
spin.addEventListener("click", callTheApi);
spin.addEventListener("click", displayTheForeccast);

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
  parameters = JSON.parse(localStorage.getItem("config"));
  // Change the language and the unit of temperature according to the user choice
  parameters[0].lan = lang.value;
  parameters[0].temp = unit.value;
  //Save the new values in the local storage
  localStorage.setItem("config", JSON.stringify(parameters));
}

//Call the API
function callTheApi(e) {
  let displayTempUnit;
  let displaySpeedUnit;

  let unit = JSON.parse(localStorage.getItem("config"))[0].temp;
  let lan = JSON.parse(localStorage.getItem("config"))[0].lan;
  let key = "6f82f2d2ceb2aa8ec59653c8cd278915";
  let nameOfCity = inputSearch.value.trim();
  if (!searchDiv.classList.contains("show")) {
    inputSearch.value = cityAndCountry.firstChild.textContent;
  }
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${nameOfCity}&units=${unit}&lang=${lan}&APPID=${key}`;

  // check the unit to display the good letter("F" or "C")
  if (unit == "imperial") {
    displayTempUnit = "F";
    displaySpeedUnit = "mph";
  }
  if (unit == "metric") {
    displayTempUnit = "C";
    displaySpeedUnit = "m/s";
  }

  // Check if the user entered something
  e.preventDefault();
  if (nameOfCity == "") {
    alert("Please, Enter a City name");
  }
  fetch(url)
    .then(res => res.json())
    .then(data => {
      //console.log(data);

      let city = data.name;
      let countryName = data.sys.country;
      let groupId = data.weather[0].id;
      let description = data.weather[0].description;
      let tempNow = data.main.temp.toFixed();
      let humidity = data.main.humidity.toFixed();
      let minTemp = Math.floor(data.main.temp_min);
      let maxTemp = Math.ceil(data.main.temp_max);
      let windSpeed = data.wind.speed.toFixed();
      let date = new Date(data.dt * 1000);
      let d = date.getDate();
      let m = months[date.getMonth()];
      let y = date.getFullYear();
      let dateOnScreen = date.toLocaleDateString();
      let sunRise = new Date(data.sys.sunrise * 1000).toLocaleTimeString(
        navigator.language, {
          hour: "2-digit",
          minute: "2-digit"
        }
      );
      let sunSet = new Date(data.sys.sunset * 1000).toLocaleTimeString(
        navigator.language, {
          hour: "2-digit",
          minute: "2-digit"
        }
      );
      let updateTime = new Date().toLocaleTimeString(

        navigator.language, {
          hour: "2-digit",
          minute: "2-digit"
        });

      // Generate the city name and country content
      fetch("js/countriesCode.json")
        .then(res => res.json())
        .then(data => {
          data.forEach(country => {
            if (countryName == country.code) {
              countryName = country.name.toUpperCase();
            }
          });
          cityAndCountry.textContent = `
        ${city}, ${countryName}
        `;
        });

      //Generate the current content
      currentSection.innerHTML = `
            <div class="icon">
                <h1><i class="wi wi-owm-${groupId}"></i></h1>
                <h4>${description}</h4>
            </div>
            <div class="temperature">
                <h1>${tempNow}&deg;</h1>
                <h1>${displayTempUnit}</h1>
                <h3>${dateOnScreen}</h3>
                <h6>Updated ${updateTime}</h6>
            </div>
            <div class="description">
                <div class="description-title">
                    <div class="sunRise">
                        <i class="wi wi-horizon-alt"></i>
                        <h6>${sunRise}</h6>
                    </div>
                    <div class="sunSet">
                        <i class="wi wi-horizon"></i>
                        <h6>${sunSet}</h6>
                    </div>
                </div>
                <div class="wind">
                    <div class="windSymbol">
                        <h3><i class="wi wi-strong-wind"></i></h3>
                    </div>
                    <div class="windValue">
                        <h5>${windSpeed}<span> ${displaySpeedUnit}</span></h5>
                    </div>
                </div>
                <div class="minmaxtemp">
                    <div class="thermometer">
                        <h5><i class="wi wi-thermometer"></i></h5>
                    </div>
                    <div class="tempvalues">
                        <div class="max">
                            <h3>${maxTemp}&deg;</h3>
                        </div>
                        <div class="min">
                            <h3>${minTemp}&deg;</h3>
                        </div>
                    </div>
                </div>
                <div class="humidity">
                    <div class="humiditySymbol">
                        <h4><i class="fas fa-tint"></i></h4>
                    </div>
                    <div class="humidityValue">
                        <h4>${humidity}%</h4>
                    </div>
                </div>
            </div>
`;
      searchDiv.classList.remove("show");
      arrow.firstElementChild.innerHTML = `<i class="fas fa-angle-down arrow-down"></i>`;
      cityName.firstElementChild.style.fontSize = "1.3rem";
    })
    .catch(() => {
      cityAndCountry.textContent = `
        City not found !
        `;
      alert("hint: Try somethimg like this: miami,us");
    });
}
searchForm.addEventListener("submit", callTheApi);
searchForm.addEventListener("submit", displayTheForeccast);

function displayTheForeccast() {
  let unit = JSON.parse(localStorage.getItem("config"))[0].temp;
  let lan = JSON.parse(localStorage.getItem("config"))[0].lan;
  let key = "6f82f2d2ceb2aa8ec59653c8cd278915";
  let nameOfCity = inputSearch.value.trim();
  let url = `http://api.openweathermap.org/data/2.5/forecast?q=${nameOfCity}&units=${unit}&lang=${lan}&APPID=${key}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      for (let i = 0; i < 5; i++) {
        const day = document.querySelector(`.day-${i + 1}`);
        // Get the data for regular interval
        let date = new Date(data.list[i * 8 + 2].dt * 1000);
        let dateOfMonth = date.getDate();
        let month = months[date.getMonth()];
        let dayOfWeek = weekDays[date.getDay()].toLocaleUpperCase();
        let groupId = data.list[i * 8 + 2].weather[0].id;
        let description = data.list[i * 8 + 2].weather[0].description;
        let temp = data.list[i * 8 + 2].main.temp.toFixed();

        day.innerHTML = `
        
        <div class="forecast-date">
                    <h4>${dayOfWeek}</h4>
                    <h5>${month} ${dateOfMonth}</h5>
                </div>
                <div class="forecast-image">
                    <h5><i class="wi wi-owm-${groupId}"></i></h5>
                </div>
                <div class="forecast-description">
                    <h6>${description}</h6>
                </div>
                <div class="forecast-min-max">
                    <h4>${temp}&deg;</h4>
                    
                </div>
        `;
      }
    });
}

function animateSync() {
  spin.classList.add("fa-spin");
  setTimeout(stopSyncAnimation, 500);

}

function stopSyncAnimation() {
  spin.classList.remove("fa-spin");

}