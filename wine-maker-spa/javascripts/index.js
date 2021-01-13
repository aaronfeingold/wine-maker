// const { Dropdown } = require("materialize-css")

const baseUrl = 'http://localhost:3000'

const revealWineFormButton = () => document.getElementById('form-reveal-button')
const wineList = () => document.getElementById('wine-list')
const form = () => document.getElementById('wine-maker-form')
const wineName = () => document.querySelector('input#wine-name')
const wineVintage = () => document.querySelector('input#wine-vintage')
const varietalDropDown = () => document.querySelector('select#varietal-selector')
const submitButton = () => document.getElementById('submit-wine')

let editing = false;
let editedWineId = null;

const wines = []


document.addEventListener("DOMContentLoaded", callOnLoad)

function callOnLoad() {
  loadWines();
  loadVarietals();
  revealWineFormButton().addEventListener('click', revealForm);
  form().addEventListener('submit', Wine.createFromForm);
  const newButton = document.querySelector('#vintage-filter')
  newButton.addEventListener('click', vintageFilter);
};

function vintageFilter() {
  // debugger;
  // return Wine.all.filter(wine => wine.vintage === 2011)
  Wine.displayFilteredWines(Wine.all.filter(wine => wine.vintage === 2011));
  }


function loadWines() {
  fetch(baseUrl + '/wines')
  .then(resp => {
    if (resp.status !== 200) {
      throw new Error(resp.statusText);
    }
    return resp.json()
  })
  .then(winesData => {
    
    Wine.createWines(winesData)
    Wine.displayWines();
  })
}
function revealForm() {
  if (revealWineFormButton().innerText === "ADD NEW WINE") {
    form().classList.remove("hidden");
    revealWineFormButton().innerText = "Or Dont";
  }
  else {
    form().classList.add("hidden")
    revealWineFormButton().innerText = "ADD NEW WINE"
  }
}

function loadVarietals() {
  fetch(baseUrl + '/varietals')
  .then(resp => {
    if (resp.status !== 200) {
      throw new Error(resp.statusText);
    }
    return resp.json()
  })
  .then(varietalsData => {
    Varietal.createVarietals(varietalsData)
    Varietal.displayVarietals();
  })
}


function resetInputs() {
  wineName().value = "";
  wineVintage().value = "";
  varietalDropDown().value = "";
}


// let defaultOption = document.createElement('option');
// defaultOption.text = 'Choose Varietals'

// varietalDropDown().add(defaultOption)
// varietalDropDown.selectedIndex = 0;
// document.addEventListener('DOMContentLoaded', function() {
//   let elems = document.querySelectorAll('select');
//   let instances = M.FormSelect.init(elems, options);
// });