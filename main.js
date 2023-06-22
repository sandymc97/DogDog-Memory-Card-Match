// mvp have a grid to hold the cards
// when the player picks a card or plays- initialize game
// when first card is picked, needs to stay up until 2nd card is flipped 
// if they are a match, stay up

// cards need to flip back when no match and display wrong or try again
// if all cards matched, you have a winner
// button to reset the board and reshuffle cards





// declare variables 
let isCardFlipped = false;
let card1, card2;
let lockBoard = false;

// reference html elements
  //pull cards from html
const cards = document.querySelectorAll('.cards');
const wrongMessage = document.querySelector("#wrong-msg");
const rightMessage = document.querySelector('.right-msg');
//functions

     //functions needed to flip cards 
function flipCards() {
    this.classList.add("flip-cards");
    if (isCardFlipped === false) {
        isCardFlipped = true;
        card1 = this;
    } else {
        isCardFlipped = false;
        card2 = this; 
        matchCheck();
    }
} 

 function matchCheck() {
    if(card1.id === card2.id) {
    card1.removeEventListener("click",flipCards);
    card2.removeEventListener("click",flipCards);
      rightMessage.innerHTML = 'Good Job!';
    } else {
      setTimeout(function() {
      card1.classList.remove("flip-cards");
      card2.classList.remove("flip-cards");
      }, 1000);
      wrongMessage.innerHTML = 'Wrong Card!';
  }
}

 //event listeners 
     //add event listener to cards so they can flip
cards.forEach(function(card){
    card.addEventListener("click",flipCards)
})


//// DO NOT FOR GET THAT YOU CAN MAKE MESSAGES GO AWAY BY wrongMessage.innerHTML = ' ' OR rightMessage.innerHTML = ' ' when winner or loser announced