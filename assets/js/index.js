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

//flip card function
function flipCard(event) {
  const clickedCard = event.target;

  //make sure only two cards can be flipped at a time and it is not already have a matched class
  if (flippedCards.length < 2 && !clickedCard.classList.contains('matched')) {
    // to make sure if it has already selected then deselect it
    if (clickedCard.classList.contains('flipped')) {
      // If the card is already flipped, de-select it
      clickedCard.classList.remove('flipped');
      //check the index of the clicked card in the flipppedCards arry
      const index = flippedCards.indexOf(clickedCard);
      //update the flippedCards array to deselect the same card
      if (index !== -1) {
        flippedCards.splice(index, 1);
      }
    } else {
      // If the card is not flipped, mark it as flipped
      clickedCard.classList.add('flipped');
      flippedCards.push(clickedCard);
      if (flippedCards.length === 2) {
        checkMatch();
      }
    }
  }
}

function checkMatch() {
 const [card1, card2] = flippedCards;
  if (card1.getAttribute('data-card') === card2.getAttribute('data-card')) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    setTimeout(() => {
      card1.setAttibute('aria-hidden', true);
      card1.setAttibute('aria-hidden', true);

      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      flippedCards = []; // after a comparison it should be cleared for the next comparison
    }, 1000);
  } else if (
    card1.getAttribute('data-card') !== card2.getAttribute('data-card')
  ) {
    card1.classList.add('notMatched');
    card2.classList.add('notMatched');
    setTimeout(() => {
      card1.classList.remove('flipped', 'notMatched');
      card2.classList.remove('flipped', 'notMatched');
      flippedCards = []; // after a comparison it should be cleared for the next comparison
    }, 1000);
  }
}

createCards();
