const userInputColorEl = document.getElementById("color-picker");
const colorTypeEl = document.getElementById("color-type");
const resultEl = document.getElementById("result");
const hexCodes = document.getElementById("codes");

let schemes;

//let set on page load
window.addEventListener("DOMContentLoaded", () => {
  getData(userInputColorEl.value);
});

//preventing page refresh on submit button of form

document.getElementById("color-info").addEventListener("submit", function (e) {
  e.preventDefault();

  //catching change on color-picker
  userInputColorEl.addEventListener("change", getData(userInputColorEl.value));
});

function getData(value) {
  // using fetchAPI getting colors

  fetch(
    `https://www.thecolorapi.com/scheme?hex=${value.slice(1)}&mode=${
      colorTypeEl.value
    }`
  )
    .then((response) => response?.json())
    .then((data) => {
      schemes = Object.keys(data?._links?.schemes);
      addSchemes(schemes); //will load available schemes
      renderColour(data?.colors);
    });
}

function addSchemes(schemes) {
  //saving current value
  const currentValue = colorTypeEl.value;
  colorTypeEl.innerHTML = " ";
  //Checking if scheme has some data or null
  if (schemes.length > 0) {
    schemes.forEach((element) => {
      const option = document.createElement("option");
      option.text = element.charAt(0).toUpperCase() + element.slice(1);
      option.value = element;
      //Not loosing current value
      element === currentValue
        ? (option.selected = true)
        : (option.selected = false);
      colorTypeEl.appendChild(option);
    });
  }
}

//lets display colors

function renderColour(colors) {
  if (colors.length > 0) {
    const result = document.createElement("div");
    result.id = "color-pallet";
    //clearing prevous code
    resultEl.innerHTML = " ";
    hexCodes.innerHTML = " ";

    colors.forEach((color) => {
      result.innerHTML += `<div id="color-pallet" style="background-color:${color.hex.value}"> </div>`;
      hexCodes.innerHTML += `<div id="codes">${color.hex.value}</div>`;
    });
    resultEl.append(result);
  }
}
