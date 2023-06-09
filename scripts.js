"use strict";

function Product(name, filePath) {
  this.name = name;
  this.filePath = filePath;
  this.viewCount = 0;
  this.voteCount = 0;
  const self = this;
  (function () {
    productArray.push(self);
  })();
}

let productArray = [];

const bag = new Product("bag", "images/bag.jpg");
const banana = new Product("banana", "images/banana.jpg");
const bathroom = new Product("bathroom", "images/bathroom.jpg");
const boots = new Product("boots", "images/boots.jpg");
const breakfast = new Product("breakfast", "images/breakfast.jpg");
const bubblegum = new Product("bubblegum", "images/bubblegum.jpg");
const chair = new Product("chair", "images/chair.jpg");
const cthulhu = new Product("cthulhu", "images/cthulhu.jpg");
const dogDuck = new Product("dogDuck", "images/dogDuck.jpg");
const dragon = new Product("dragon", "images/dragon.jpg");
const pen = new Product("pen", "images/pen.jpg");
const petSweep = new Product("petSweep", "images/petSweep.jpg");
const scissors = new Product("scissors", "images/scissors.jpg");
const shark = new Product("shark", "images/shark.jpg");
const sweep = new Product("sweep", "images/sweep.jpg");
const tauntaun = new Product("tauntaun", "images/tauntaun.jpg");
const unicorn = new Product("unicorn", "images/unicorn.jpg");
const waterCan = new Product("waterCan", "images/waterCan.jpg");
const wineGlass = new Product("wineGlass", "images/wineGlass.jpg");

console.log(productArray);

function randomMinMax(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
let img1 = document.getElementById("img1");
let img2 = document.getElementById("img2");
let img3 = document.getElementById("img3");

let renderCounter = 0;
let maximumVotesAllowed = 25;
let previousProductArray = [];
function renderThreeImages() {
  if (renderCounter >= maximumVotesAllowed) {
    alert("voting is over! Check the scores!");
    productImageSection.removeEventListener("click", actionOnVote);
    productImageSection.className = "voting-over";
    renderChart();
  } else {
    let product1 = randomMinMax(0, productArray.length);
    while (previousProductArray.includes(product1)) {
      product1 = randomMinMax(0, productArray.length);
    }
    let product2 = randomMinMax(0, productArray.length);
    while (product1 == product2 || previousProductArray.includes(product2)) {
      product2 = randomMinMax(0, productArray.length);
    }
    let product3 = randomMinMax(0, productArray.length);
    while (product3 == product1 || product3 == product2 || previousProductArray.includes(product3)) {
      product3 = randomMinMax(0, productArray.length);
    }
    console.log(product1, product2, product3);

    img1.src = productArray[product1].filePath;
    img1.alt = productArray[product1].name;
    productArray[product1].viewCount++;
    img2.src = productArray[product2].filePath;
    img2.alt = productArray[product2].name;
    productArray[product2].viewCount++;
    img3.src = productArray[product3].filePath;
    img3.alt = productArray[product3].name;
    productArray[product3].viewCount++;

    previousProductArray = [product1, product2, product3];

    renderCounter++;
    console.log("rendercounter: " + renderCounter);
  }
}

function actionOnVote(event) {
  let chosenProduct = event.target.alt;
  for (let i = 0; i < productArray.length; i++) {
    if (chosenProduct === productArray[i].name) {
      productArray[i].voteCount++;
      console.log(productArray[i].name, productArray[i].voteCount, productArray[i].viewCount);
      break;
    }
  }
  saveVoteData();
  renderThreeImages();
}

// function renderResults() {
//   let table = document.querySelector("table");
//   let newRow = document.createElement("tr");
//   table.appendChild(newRow);
//   let newCell = document.createElement("td");
//   newCell.textContent = "Product";
//   newRow.appendChild(newCell);
//   newCell = document.createElement("td");
//   newCell.textContent = "View Count";
//   newRow.appendChild(newCell);
//   newCell = document.createElement("td");
//   newCell.textContent = "Vote Count";
//   newRow.appendChild(newCell);
//   newCell = document.createElement("td");
//   newCell.textContent = "Percentage of rounds won";
//   newRow.appendChild(newCell);
//   for (let i = 0; i < productArray.length; i++) {
//     let newRow = document.createElement("tr");
//     table.appendChild(newRow);
//     let newCell = document.createElement("td");
//     newCell.textContent = productArray[i].name;
//     newRow.appendChild(newCell);
//     newCell = document.createElement("td");
//     newCell.textContent = productArray[i].viewCount;
//     newRow.appendChild(newCell);
//     newCell = document.createElement("td");
//     newCell.textContent = productArray[i].voteCount;
//     newRow.appendChild(newCell);
//     newCell = document.createElement("td");
//     if (productArray[i].viewCount == 0) {
//       newCell.textContent = "not seen!";
//     } else {
//       newCell.textContent = Math.floor((productArray[i].voteCount / productArray[i].viewCount) * 100) + "%";
//     }
//     newRow.appendChild(newCell);
//   }
// }

let globalChart;

function renderChart() {
  let tableDiv = document.getElementById("table-div");
  tableDiv.className = "visible";
  const nameArray = [];
  const votesArray = [];
  const viewsArray = [];

  for (let i = 0; i < productArray.length; i++) {
    nameArray.push(productArray[i].name);
    votesArray.push(productArray[i].voteCount);
    viewsArray.push(productArray[i].viewCount);
  }

  const myChart = document.getElementById("myChart");

  globalChart?.destroy();

  globalChart = new Chart(myChart, {
    type: "bar",
    data: {
      labels: nameArray,
      datasets: [
        {
          label: "views",
          data: viewsArray,
          backgroundColor: "#9F0D3D",
        },
        {
          label: "votes",
          data: votesArray,
          backgroundColor: "#A78DA4",
        },
      ],
    },
  });
}

renderThreeImages();

let productImageSection = document.getElementById("product-image-section");
productImageSection.addEventListener("click", actionOnVote);

function saveVoteData() {
  let savedVotes = JSON.stringify(productArray);
  localStorage.setItem("vote data", savedVotes);
  console.log(savedVotes);
  console.log(productArray);
}
function loadVoteData() {
  if (localStorage.getItem("vote data") !== null) {
    productArray = JSON.parse(localStorage.getItem("vote data"));
    console.log(productArray);
  }
}
function clearLocalStorage() {
  localStorage.clear();
  for (let i = 0; i < productArray.length; i++) {
    productArray[i].viewCount = 0;
    productArray[i].voteCount = 0;
  }
  if (renderCounter >= maximumVotesAllowed) {
    renderChart();
    alert("Local storage cleared, refresh page.");
  } else {
    alert("Local storage cleared, refresh page.");
    productImageSection.removeEventListener("click", actionOnVote);
    productImageSection.className = "voting-over";
  }
}

loadVoteData();
