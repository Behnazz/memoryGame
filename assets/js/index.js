//playing game started
const gameInProgress = true;

//Fisher-Yates shuffle algorithm
const cards = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 16, 15, 14, 13, 12, 11,
  10, 9, 8, 7, 6, 5, 4, 3, 2, 1,
];
let shuffledCards = cards
  .map((element) => ({ sort: Math.random(), value: element }))
  .sort((a, b) => a.sort - b.sort)
  .map((element) => element.value);
5;

let flippedCards = []; //create array for flipped cards

const gameBoard = document.getElementById('gameBoard'); //create game board element
//create cards
function createCards() {
  for (let i = 0; i < shuffledCards.length; i++) {
    const card = document.createElement('button'); //make a div
    card.classList.add('card'); //add class
    card.setAttribute('data-card', shuffledCards[i]); //add data attribute
    card.textContent = shuffledCards[i]; //add text
    card.setAttribute('role', 'option'); //add ARIA role for each card
    card.setAttribute('aria-hidden', 'false');
    card.setAttribute('tabindex', '0'); // tab key to cycle through the cards
    card.setAttribute('aria-pressed', 'false');
    gameBoard.appendChild(card); //append to game board

    card.addEventListener('click', flipCard); //add event listener
    //keyboard card click listener
    card.addEventListener('keydown', (event) => {
      if (event.key === ' ' || event.key === 'Enter') {
        flipCard(event);
      }
    });
  }
}

//flip card function
function flipCard(event) {
  //if the game is not in progress then return
  if (gameInProgress) {
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
          clickedCard.setAttribute('aria-selected', 'false');
        }
      } else {
        // If the card is not flipped, mark it as flipped
        clickedCard.classList.add('flipped');
        flippedCards.push(clickedCard);
        clickedCard.setAttribute('aria-selected', 'true');
        if (flippedCards.length === 2) {
          checkMatch();
        }
      }
    }
    if (event.key === '' || event.key === 'Enter') {
      event.preventDefault(); // prevent default key behaviour
      if (!clickedCard.classList.contains('matched')) {
        if (clickedCard.classList.toggle('flipped')) {
          flippedCards.push(clickedCard);
          clickedCard.setAttribute('aria-selected', 'true');
          clickedCard.setAttribute('aria-press', 'true');
          if (flippedCards.length === 2) {
            checkMatch();
          }
        }
      }
    }
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  // This block handles matching cards
  if (card1.getAttribute('data-card') === card2.getAttribute('data-card')) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    setTimeout(() => {
      card1.setAttribute('aria-hidden', true);
      card2.setAttribute('aria-hidden', true);

      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      flippedCards = []; // after a comparison it should be cleared for the next comparison
      // check if all cards are matched and hidden
      if (document.querySelectorAll('.matched').length === 32) {
        showWinningMessage();
      }
    }, 1000);
  } else if (
    // This block handles non-matching cards
    card1.getAttribute('data-card') !== card2.getAttribute('data-card')
  ) {
    card1.classList.add('notMatched');
    card2.classList.add('notMatched');
    setTimeout(() => {
      card1.setAttribute('aria-selected', 'false');
      card2.setAttribute('aria-selected', 'false');
      card1.setAttribute('aria-pressed', 'false');
      card2.setAttribute('aria-pressed', 'false');
      card1.setAttribute('aria-hidden', 'false');
      card2.setAttribute('aria-hidden', 'false');
      card1.classList.remove('flipped', 'notMatched');
      card2.classList.remove('flipped', 'notMatched');

      flippedCards = []; // after a comparison it should be cleared for the next comparison
    }, 1000);
  }
}
//show winning message
function showWinningMessage() {
  gameInProgress = false;
  //show modal
  const winningMessage = document.getElementById('winningMessage');
  winningMessage.showModal();

  //paly again button
  const PlayAgainButton = document.getElementById('playAgain');
  playAgain.addEventListener('click', () => {
    winningMessage.close();
    //reset game
    location.reload();
  });
}

createCards();
