const icons = [
  '<i class="fa-solid fa-bicycle"></i>',
  '<i class="fa-solid fa-bug"></i>',
  '<i class="fa-solid fa-radio"></i>',
  '<i class="fa-solid fa-bus"></i>',
  '<i class="fa-solid fa-cannabis"></i>',
  '<i class="fa-solid fa-chess-knight"></i>',
  '<i class="fa-solid fa-computer"></i>',
  '<i class="fa-solid fa-crown"></i>',
  '<i class="fa-solid fa-apple-whole"></i>',
  '<i class="fa-solid fa-mosquito"></i>',
  '<i class="fa-solid fa-heart"></i>',
  '<i class="fa-solid fa-cloud-arrow-up"></i>',
  '<i class="fa-solid fa-basketball"></i>',
  '<i class="fa-solid fa-crow"></i>',
  '<i class="fa-solid fa-dice-six"></i>',
  '<i class="fa-solid fa-flask"></i>',
  '<i class="fa-solid fa-gas-pump"></i>',
  '<i class="fa-solid fa-mobile-retro"></i>',
];
const BASE_ICON = '<i class="fa-solid fa-circle-question"></i>';
const SIZE = 4; //row size always to be % 2
let clickedIcon1, clickedIcon2;
let clearedIcons = 0;
let table = document.querySelector("#mainTable");
let board = document.querySelector("#gameArea");
createHTMLBoard(SIZE);
let startTime = Date.now();
const hiddenIcons = setHiddenIcons();

function clickTile() {
  this.style.backgroundColor = "khaki";
  this.innerHTML = hiddenIcons[this.id];
  if (clickedIcon1 == null) {
    clickedIcon1 = document.getElementById(this.id);
  } else {
    clickedIcon2 = document.getElementById(this.id);
    if (clickedIcon1.id == clickedIcon2.id) return;
    if (clickedIcon1.innerHTML == clickedIcon2.innerHTML) {
      tilesMatch();
      if (isWinner()) {
        let endTime = Date.now();
        table.style.borderColor = "goldenrod";
        table.style.opacity = "0.5";
        let victoryLabel = document.createElement("h1");
        let timeElapsed = `Time: ${Math.floor((endTime - startTime) / 1000)}s`;
        victoryLabel.innerHTML =
          '<i id ="victory" class="fa-solid fa-trophy"></i>&nbspYou Win!<br><i class="fa-solid fa-clock"></i>&nbsp' +
          timeElapsed;
        let playAgainBtn = document.createElement("button");
        playAgainBtn.innerHTML =
          '<i class="fa-solid fa-play"></i>&nbspPlay again';
        playAgainBtn.addEventListener("click", () => window.location.reload());
        board.appendChild(playAgainBtn);
        board.appendChild(victoryLabel);
        board.appendChild(timeElapsed);
      }
    } else {
      let tiles = document.querySelectorAll(".tile");
      tiles.forEach((element) => {
        element.removeEventListener("click", clickTile);
      });
      setTimeout(() => {
        tilesNotMatch();
      }, 900);
    }
  }

  function isWinner() {
    return clearedIcons == SIZE * SIZE;
  }

  function tilesNotMatch() {
    clickedIcon1.style.backgroundColor = "white";
    clickedIcon1.style.borderColor = "black";
    clickedIcon2.style.backgroundColor = "white";
    clickedIcon2.style.borderColor = "black";
    clickedIcon1.innerHTML = BASE_ICON;
    clickedIcon2.innerHTML = BASE_ICON;
    clickedIcon1 = null;
    clickedIcon2 = null;
    let tiles = document.querySelectorAll(".tile");
    tiles.forEach((element) => {
      element.addEventListener("click", clickTile);
    });
  }

  function tilesMatch() {
    clickedIcon1.style.backgroundColor = "chartreuse";
    clickedIcon1.style.borderColor = "darkgreen";
    clickedIcon2.style.backgroundColor = "chartreuse";
    clickedIcon2.style.borderColor = "darkgreen";
    clickedIcon1.removeEventListener("click", clickTile);
    clickedIcon2.removeEventListener("click", clickTile);
    clickedIcon1.classList.remove("tile");
    clickedIcon2.classList.remove("tile");
    clickedIcon1 = null;
    clickedIcon2 = null;
    clearedIcons += 2;
  }
}

function setHiddenIcons() {
  let hiddenIcons = new Array(SIZE * SIZE);
  for (let i = 0; i < hiddenIcons.length; i += 2) {
    let randomIconIndex = Math.floor(Math.random() * icons.length);
    hiddenIcons[i] = icons[randomIconIndex];
    icons.splice(randomIconIndex, 1);
    hiddenIcons[i + 1] = hiddenIcons[i];
  }
  return shuffleArray(hiddenIcons);
}

function shuffleArray(array) {
  for (let i = 0; i < array.length; i++) {
    let j = Math.floor(Math.random() * array.length);
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function createHTMLBoard(size) {
  let cellId = 0;
  for (let i = 0; i < size; i++) {
    let tableRow = document.createElement("tr");
    table.appendChild(tableRow);
    for (let j = 0; j < size; j++) {
      let tableCell = document.createElement("th");
      tableCell.classList.add("tile");
      tableCell.setAttribute("id", cellId);
      tableRow.appendChild(tableCell);
      cellId++;
    }
  }
  let tiles = document.querySelectorAll(".tile");
  tiles.forEach((element) => {
    element.addEventListener("click", clickTile);
    element.innerHTML = BASE_ICON;
  });
}
