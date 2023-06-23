
// when the player picks a card or plays- initialize game
// if all cards matched, you have a winner
//if time runs out, you have a loser
// button to reset game





// declare variables 
let isCardFlipped = false;
let card1, card2;
let pauseGame = false;
let matchedCards = 0;

const TIME_LIMIT = 45;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;



// reference html elements
const cards = document.querySelectorAll('.cards');
const wrongMessage = document.querySelector("#wrong-msg");
const rightMessage = document.querySelector('.right-msg');
const resultsMessage = document.querySelector('#results-msg');
const play = document.querySelector("button")


     //functions 
function shuffleCards() {
    for (let i = 0; i < cards.length; i++) {
          let shuffle = Math.floor(Math.random() * 12);
          cards[i].style.order = shuffle;
        };
    }
      shuffleCards();

function flipCards() {
    if (pauseGame === true){
    return }
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



function unflipCards() {
      pauseGame = true;
      setTimeout(function() {
      card1.classList.remove("flip-cards");
      card2.classList.remove("flip-cards");
      pauseGame = false;
      }, 1000);
 }

 function matchCheck() {
    if(card1.id === card2.id) {
        matchedCards++;
    card1.removeEventListener("click",flipCards);
    card2.removeEventListener("click",flipCards);
      rightMessage.innerHTML = 'Good Job!';
      renderResults()
    } else {
     unflipCards();
     wrongMessage.innerHTML = 'Wrong Card!';
  }
}




function renderResults() {
    if (matchedCards === 6 && timeLeft > 0) {
        wrongMessage.innerHTML = " ";
        rightMessage.innerHTML = " ";
       resultsMessage.innerHTML = "You won!"
       clearInterval(timerInterval);
    } 
    }



function playAgain(){
    window.location.reload();
  }
  startTimer();

 //event listeners 
     //add event listener to cards so they can flip
     cards.forEach(function(card){
        card.addEventListener("click",flipCards)
    })
    
    //  play.addEventListener("click", startTimer)
    // console.log(play)
    
      

   
   document.getElementById("time").innerHTML = `
   <div class="base-timer">
     <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      
         <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
         <path
           id="base-timer-path-remaining"
           stroke-dasharray="283"
           d="
             M 50, 50
             m -45, 0
             a 45,45 0 1,0 90,0
             a 45,45 0 1,0 -90,0
           "
         ></path>
       </g>
     </svg>
     <span id="base-timer-label" class="base-timer__label">${formatTime(
        timeLeft
      )}</span>
   </div>
   `;
   

   
function onTimesUp() {
    wrongMessage.innerHTML = " ";
        rightMessage.innerHTML = " ";
        resultsMessage.innerHTML = "You lost!"
     clearInterval(timerInterval);
   }
   
function startTimer() {
     timerInterval = setInterval(() => {
       timePassed += 1;
       timeLeft = TIME_LIMIT - timePassed;
       document.getElementById("base-timer-label").innerHTML = formatTime(
         timeLeft
       );
       if (timeLeft === 0) {
         onTimesUp();
       }
     }, 1000);
   }
   
function formatTime(time) {
     const minutes = Math.floor(time / 60);
     let seconds = time % 60;
     if (seconds < 10) {
       seconds = `0${seconds}`;
     }
     return `${minutes}:${seconds}`;
   }
   
   
   
   
   