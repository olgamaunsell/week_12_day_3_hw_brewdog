const app = function () {
  const url = "https://s3-eu-west-1.amazonaws.com/brewdogapi/beers.json";
  makeRequest(url, requestComplete);
};

const makeRequest = function (url, callback) {
  const request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", callback);
  request.send();
}

const requestComplete = function () {
  if(this.status !== 200) return;
  const jsonString = this.responseText;
  const beers = JSON.parse(jsonString);

  // populateList(beers);
  populateDropdown(beers);
}

const populateList = function (beers) {

  const beerList = document.getElementById("beer-list");

  beers.forEach(function (beer) {
    const li = document.createElement("li");
    li.innerText = beer.name;
    const image = document.createElement("img");

    image.height = "200";
    image.src = beer.image_url;

    beerList.appendChild(li);
    beerList.appendChild(image);
  });
}

const populateDropdown = function (beers) {

  const dropdown = document.querySelector("select");

  beers.forEach(function (beer, index) {
    const option = document.createElement("option");
    option.value = index;
    option.innerText = beer.name;
    dropdown.appendChild(option);
  });

  const handleSelectChanged = function () {

    const selectedBeer = beers[this.value];

    const beerUl = document.getElementById("beer-info");
    beerUl.innerHTML = "";
    const name = document.createElement('li');
    name.innerText = `Name: ${selectedBeer.name}`
    beerUl.appendChild(name);

    const description = document.createElement('li');
    description.innerText = `Description: ${selectedBeer.description}`
    beerUl.appendChild(description);

    const firstBrewed = document.createElement('li');
    firstBrewed.innerText = `First Brewed: ${selectedBeer.firstBrewed}`
    beerUl.appendChild(firstBrewed);

    const abv = document.createElement('li');
    abv.innerText = `Alcohol by Volume: ${selectedBeer.abv}`
    beerUl.appendChild(abv);

    const lineBreak = document.createElement('br');
    beerUl.appendChild(lineBreak);
    const image = document.createElement("img");

    image.height = "400";
    image.src = selectedBeer.image_url;

    beerUl.appendChild(image);

    // also storing last beer selected to local storage

    const jsonString = JSON.stringify(selectedBeer);
    localStorage.setItem('last beer selected', jsonString);

  }
  dropdown.addEventListener('change', handleSelectChanged);
}

document.addEventListener('DOMContentLoaded', app);
