let arrow = document.querySelector(".arrow");
let searchDiv = document.querySelector(".city-search");
arrow.addEventListener("click", toggleSearchBar);

function toggleSearchBar(e) {
  if (e.target.classList.contains("arrow-down")) {
    searchDiv.classList.add("show");
    arrow.firstElementChild.innerHTML = `<i class="fas fa-angle-up arrow-up"></i>`;
  }
  if (e.target.classList.contains("arrow-up")) {
    searchDiv.classList.remove("show");
    arrow.firstElementChild.innerHTML = `<i class="fas fa-angle-down arrow-down"></i>`;
  }
}
// Get the settings button
const param = document.querySelector(".param");

param.addEventListener("click", openSettings);
// Get the parameter box
const setting = document.querySelector(".setting");

function openSettings() {
  setting.classList.add("displaySettings");
}

const btn = document.querySelectorAll("button");

btn[1].addEventListener("click", closeSettings);
//btn[0].addEventListener("click", saveSettings);
btn[0].addEventListener("click", closeSettings);

function closeSettings() {
  setting.classList.remove("displaySettings");
}
