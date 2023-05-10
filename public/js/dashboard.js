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
            <img src="${beer.image_url}" alt="${beer.name}">
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

      const removeButton = beerItem.querySelector("button");
      removeButton.addEventListener("click", (event) => {
        const beerId = event.target.dataset.id;
        beersToTry = beersToTry.filter((beer) => beer.id !== beerId);
        renderBeersToTry();
      });
    });
  }
// };
