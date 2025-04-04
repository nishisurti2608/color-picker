const userInputColorEl = document.getElementById("color-picker").value;
const colorTypeEl = document.getElementById("color-type");
const resultEl = document.getElementById("result");
let schemes;
//preventing page refresh on submit button of form

document.getElementById("color-info").addEventListener("submit", function (e) {
  e.preventDefault();
});

// using fetchAPI getting colors

fetch("https://www.thecolorapi.com/scheme?hex=${userInputColorEl}")
  .then((response) => response?.json())
  .then((data) => {
    schemes = Object.keys(data?._links?.schemes);
    addSchemes(schemes);
    renderColour(data?.colors);
  });

function addSchemes(schemes) {
  //Checking if scheme has some data or null
  if (schemes.length > 0)
    schemes.forEach((element) => {
      const option = document.createElement("option");
      option.text = element.charAt(0).toUpperCase() + element.slice(1);
      option.value = element;
      colorTypeEl.appendChild(option);
    });
}

//lets display data

function renderColour(colors) {
  const result = document.createElement("div");
  result.id = "color-pallet";

  colors.forEach((color) => {
    result.innerHTML += `<div id="color-pallet" style="background-color:${color.hex.value}">${color.hex.value}</div>`;
  });
  resultEl.append(result);
}
