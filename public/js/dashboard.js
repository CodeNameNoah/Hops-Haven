// const searchFormHandler = async (event) => {
//   event.preventDefault();

  const form = document.querySelector("form");
  const input = document.querySelector("#search");
  const results = document.querySelector("#results");
  const favoritesList = document.querySelector("#favorites");
  const beersToTryList = document.querySelector("#beers-to-try");
  let favorites = [];
  let beersToTry = [];

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const searchTerm = input.value;
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

    const buttons = document.querySelectorAll("#results button");
    buttons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const beerId = event.target.dataset.id;
        const beerName = event.target.dataset.name;
        const beer = { id: beerId, name: beerName };
        if (event.target.id === "add-to-list") {
          beersToTry.push(beer);
          renderBeersToTry();
        } else {
          favorites.push(beer);
          renderFavorites();
        }
      });
    });
  });

  function renderFavorites() {
    favoritesList.innerHTML = "";
    favorites.forEach((beer) => {
      const beerItem = document.createElement("li");
      beerItem.innerHTML = `${beer.name} <button data-id="${beer.id}">Remove</button>`;
      favoritesList.appendChild(beerItem);

      alert("Added to Favorites!");

      const removeButton = beerItem.querySelector("button");
      removeButton.addEventListener("click", (event) => {
        const beerId = event.target.dataset.id;
        favorites = favorites.filter((beer) => beer.id !== beerId);
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

      alert("Added to Beers to Try!");

      const removeButton = beerItem.querySelector("button");
      removeButton.addEventListener("click", (event) => {
        const beerId = event.target.dataset.id;
        beersToTry = beersToTry.filter((beer) => beer.id !== beerId);
        renderBeersToTry();
      });
    });
  }

    // Load saved lists from local storage when the page loads
    window.addEventListener('DOMContentLoaded', function () {
      const beersToTryStorageList = JSON.parse(localStorage.getItem('beersToTry')) || [];
      const favoritesStorageList = JSON.parse(localStorage.getItem('favorites')) || [];
  
      // Display the saved lists
      const beersToTryStorageListElement = document.getElementById('beers-to-try');
      const favoritesListStorageElement = document.getElementById('favorites');
  
      beersToTryStorageList.forEach(function (beer) {
        const li = document.createElement('li');
        li.textContent = beer;
        beersToTryStorageListElement.appendChild(li);
      });
  
      favoritesStorageList.forEach(function (beer) {
        const li = document.createElement('li');
        li.textContent = beer;
        favoritesStorageListElement.appendChild(li);
      });
    });
  
    // Save lists to local storage when a beer is added
    document.addEventListener('submit', function (event) {
      event.preventDefault();
      const searchInput = document.getElementById('search');
      const beerName = searchInput.value;
  
      // Save the beer to the appropriate list
      const favoritesStorageList = JSON.parse(localStorage.getItem('favorites')) || [];
      favoritesStorageList.push(beerName);
      localStorage.setItem('favorites', JSON.stringify(favoritesList));
  
      // Update the favorites list on the page
      const favoritesStorageListElement = document.getElementById('favorites');
      const li = document.createElement('li');
      li.textContent = beerName;
      favoritesStorageListElement.appendChild(li);
  
      searchInput.value = '';
    });