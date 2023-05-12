const form = document.querySelector("form");
const input = document.querySelector("#search");
const results = document.querySelector("#results");
const favoritesList = document.querySelector("#favorites");
const beersToTryList = document.querySelector("#beers-to-try");
let favorites = [];
let beersToTry = [];

//--adding data to localstorage
function saveDatatoLocal(key,value){
  const savedValue = localStorage.getItem(key)
  localStorage.setItem(key,JSON.stringify(value));
}


// This function will run on initial loading only 
function init(){
  const searchTerm = localStorage.getItem('searchTerm') || '';
  const favoritesList = localStorage.getItem('favorites');
  const beersToTryList = localStorage.getItem('beersToTry');
  if(searchTerm){
    const initialSearchValue = JSON.parse(searchTerm)
    // input.value = initialSearchValue;
    fetchAndRenderData(initialSearchValue)
  }
  if(favoritesList){
    favorites = JSON.parse(favoritesList);
    console.log({favorites},JSON.parse(favoritesList))
    renderFavorites();
  }
  if(beersToTryList){
    beersToTry = JSON.parse(beersToTryList);
    renderBeersToTry();
  }
};

init()

// Defining function for fetching data
async function fetchAndRenderData(searchTerm){
  const response = await fetch(
    `https://api.punkapi.com/v2/beers?beer_name=${searchTerm}`
  );

  const data = await response.json();
  results.innerHTML = "";

  data.forEach((beer) => {
    const beerDiv = document.createElement("div");
    beerDiv.innerHTML = `
        <h2>${beer.name}</h2>
        <p>${beer.description}</p>
        ${beer.image_url ? `<img src="${beer.image_url}" alt="${beer.name}">`: ''}
        <button data-id="${beer.id}" data-name="${beer.name}">Add to Favorites</button>
        <button id="add-to-list" data-id="${beer.id}" data-name="${beer.name}">Add to Beers to Try</button>
      `;
    results.appendChild(beerDiv);
  });

  // Attaching 'click' event to all buttons of item list; 
  attachEventToBtn();
}

function attachEventToBtn(){
  const buttons = document.querySelectorAll("#results button");
  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const beerId = event.target.dataset.id;
      const beerName = event.target.dataset.name;
      const beer = { id: beerId, name: beerName };
      if (event.target.id === "add-to-list") {
        beersToTry.push(beer);
        // Saving Data to Local Storage
        saveDatatoLocal('beersToTry',beersToTry)
        renderBeersToTry();
      } else {
        favorites.push(beer);
        // Saving Data to Local Storage
        saveDatatoLocal('favorites',favorites)
        renderFavorites();
      }
    });
  });
}


form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const searchTerm = input.value;

  // Saving Search Value to Local Storage
  saveDatatoLocal("searchTerm",searchTerm)
  fetchAndRenderData(searchTerm)
});

function renderFavorites() {
  favoritesList.innerHTML = "";
  favorites.forEach((beer) => {
    const beerItem = document.createElement("li");
    beerItem.innerHTML = `${beer.name} <button data-id="${beer.id}">Remove</button>`;
    favoritesList.appendChild(beerItem);

    const removeButton = beerItem.querySelector("button");
    removeButton.addEventListener("click", (event) => {
      const beerId = event.target.dataset.id;
      favorites = favorites.filter((beer) => beer.id !== beerId);
      saveDatatoLocal('favorites',favorites)
      renderFavorites();
    });
  });
}

function renderBeersToTry() {
  beersToTryList.innerHTML = "";
  beersToTry.forEach((beer) => {
    const beerItem = document.createElement("li");
    beerItem.innerHTML = `${beer.name} <button data-id="${beer.id}">Remove</button>`;
    beersToTryList.appendChild(beerItem);

    const removeButton = beerItem.querySelector("button");
    removeButton.addEventListener("click", (event) => {
      const beerId = event.target.dataset.id;
      beersToTry = beersToTry.filter((beer) => beer.id !== beerId);
      
      //--again adding data to local storage
      saveDatatoLocal('beersToTry',beersToTry)
      renderBeersToTry();
    });
  });
}
