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
        const beer = { name: beerName, beer_id: beerId };

        console.log(beer);
        if (event.target.id === "add-to-list") {
          beersToTry.push(beer);
          renderBeersToTry();
        } else {
          favorites.push(beer);
          renderFavorites();

          // addToFavorite(beer);
        }
      });
    });
  });

  async function addToFavorite(beer) {
    let favBeers;

    const addResponse = await fetch("/api/favBeers", {
      method: "POST",
      body: JSON.stringify(beer),
      headers: {
        "Content-Type": "application/json"
      }
    })

    if (addResponse.ok) {
      favBeers = await fetch("/api/favBeers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }) 

      console.log(favBeers)
    }
  }

  async function addToBeerToTry(beer) {
    const addResponse = await fetch("/api/beerToTry", {
      method: "POST",
      body: JSON.stringify(beer),
      headers: {
        "Content-Type": "application/json"
      }
    })

    if (response.ok) {
      
    }
  }



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