//Fisher-Yates shuffle algorithm
const cards = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 16, 15, 14, 13, 12, 11,
  10, 9, 8, 7, 6, 5, 4, 3, 2, 1,
];
let suffledCards = cards
  .map((element) => ({ sort: Math.random(), value: element }))
  .sort((a, b) => a.sort - b.sort)
  .map((element) => element.value);
5;

let flippedCards = []; //create array for flipped cards

const gameBoard = document.getElementById('gameBoard'); //create game board element
//create cards
function createCards() {
  for (let i = 0; i < suffledCards.length; i++) {
    const card = document.createElement('div'); //make a div
    card.classList.add('card'); //add class
    card.setAttribute('data-card', suffledCards[i]); //add data attribute
    card.textContent = suffledCards[i]; //add text
    gameBoard.appendChild(card); //append to game board

    gameBoard.addEventListener('click', flipCard); //add event listener
  }
}

function flipCard(event) {
  const clickedCard = event.target;
  clickedCard.classList.add('flipped');
  if (flippedCards.length < 2) {
    flippedCards.push(clickedCard);
  }
  if (flippedCards.length === 2) {
    checkMatch();
  }
}

function checkMatch() {
  let card1 = flippedCards[0];
  let card2 = flippedCards[1];
  if (card1.getAttribute('data-card') === card2.getAttribute('data-card')) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    flippedCards = [];
  } else {
    card1.classList.add('notMatched');
    card2.classList.add('notMatched');
    flippedCards = [];
  }
}

createCards();
