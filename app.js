const gameContainer = document.getElementById("game");

let card1 = null;
let card2 = null;
let totalCards = 0;
let clicked = false;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];

function shuffle(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);

    counter--;

    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

function handleCardClick(e) {
  let card = e.target;
  let targetClass = e.target.className;

  card.style.backgroundColor = targetClass;

  if (clicked) return;
  if (card.classList.contains("flipped")) return;

  if (!card1 || !card2) {
    card.classList.add("flipped");
    card1 = card1 || card;
    card2 = card === card1 ? null : card;
  }

  if (card1 && card2) {
    clicked = true;
    card1Class = card1.className;
    card2Class = card2.className;

    if (card1Class == card2Class) {
      totalCards += 2;
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick);
      card1 = null;
      card2 = null;
      clicked = false;
    } else {
      setTimeout(function () {
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1 = null;
        card2 = null;
        clicked = false;
      }, 1000);
    }
  }

  if (totalCards == COLORS.length) alert("game over!");
}

createDivsForColors(shuffledColors);
