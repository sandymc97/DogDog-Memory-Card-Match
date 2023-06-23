let isCardFlipped = false;
let card1, card2;
let pauseGame = false;
let matchedCards = 0;
const TIME_LIMIT = 40;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let bark = new Audio('assets/bark.mp3')
let win = new Audio('assets/win-sound.mp3')
let lose = new Audio('assets/lose-sound.mp3')

const cards = document.querySelectorAll('.cards');
const wrongMessage = document.querySelector("#wrong-msg");
const rightMessage = document.querySelector('.right-msg');
const wonMessage = document.querySelector('.won-msg');
const lostMessage = document.querySelector('#lost-msg');
const reset = document.querySelector("button")




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
      cards.forEach(function (card){
        card.removeEventListener("click",startTimer)
    })
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
        bark.play()
        matchedCards++;
    card1.removeEventListener("click",flipCards);
    card2.removeEventListener("click",flipCards);
      rightMessage.innerHTML = 'Good Job!';
      onWin()
    } else {
     unflipCards();
     wrongMessage.innerHTML = 'Wrong Card!';
  }
}

function onWin() {
    if (matchedCards === 6 && timeLeft > 0) {
        wrongMessage.innerHTML = " ";
        rightMessage.innerHTML = " ";
       wonMessage.innerHTML = "You won!"
       win.play()
       clearInterval(timerInterval);
      } 
    }

function onTimesUp() {
        wrongMessage.innerHTML = " ";
        rightMessage.innerHTML = " ";
            lostMessage.innerHTML =  "You lost!";
            clearInterval(timerInterval);
            lose.play();
        cards.forEach(function (card){
            card.removeEventListener("click",flipCards)
        })
    }

function resetGame(){
    window.location.reload();
  }

   
   document.getElementById("time").innerHTML = `
   <div class="base-timer">
     <span id="timer" class="timer-text">${formatTime(
        timeLeft
      )}</span>
   </div>
   `;
   
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
  }

function startTimer() {
     timerInterval = setInterval(() => {
       timePassed += 1;
       timeLeft = TIME_LIMIT - timePassed;
       document.getElementById("timer").innerHTML = formatTime(
         timeLeft
       );
       if (timeLeft === 0) {
         onTimesUp();
       }
     }, 1000);
   }
   

   
  cards.forEach(function (card){
    card.addEventListener("click",startTimer)
  })

  cards.forEach(function (card){
        card.addEventListener("click",flipCards)
  })
   
   
   