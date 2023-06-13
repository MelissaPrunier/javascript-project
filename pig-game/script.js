'use strict';

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const dice = document.querySelector('.dice');
const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

let scores, currentScore, activePlayer, playing;
const init = function () {
     //Starting code for making the starting features
    scores = [0,0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;//using playing for ending the game when someone have won it
    
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
     player0El.classList.remove('player--winner');
     player1El.classList.remove('player--winner');
     player0El.classList.add('player--active');
     player1El.classList.remove('player--active');
     dice.classList.add('hidden');

}

init();
const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
        activePlayer = activePlayer === 0 ? 1 : 0;
        currentScore = 0;
        player0El.classList.toggle('player--active');
        player1El.classList.toggle('player--active');
}

btnRollDice.addEventListener('click', function () {
    if (playing) {
        
        const diceNumber = Math.trunc(Math.random() * 6) + 1;
    
        dice.classList.remove('hidden');
        dice.src = `./img/dice-${diceNumber}.png`;

        if (diceNumber === 1) {
            switchPlayer();
        }
        else {
            currentScore += diceNumber;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }
    }
});

btnHold.addEventListener('click', function () {
    if (playing) {
        //1. Add current score to active player's score
        scores[activePlayer] += currentScore;

        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        //2. Check if player's score is >= 100
        if (scores[activePlayer] >= 20) {
            playing = false;
            dice.classList.add('hidden');

            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        }
        else {
            // Switch to the next player
            switchPlayer();
        }
    
    }
});

btnNew.addEventListener('click', init );//reusing the init function for resetting the game.