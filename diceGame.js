"use strict";

let diceRoll = 0;
let currentScore = 0;
let p1TotalScore = 0;
let p2TotalScore = 0;
let activePlayer = 0;
let p1Score = 0;
let p2Score = 0;
let isGame = true;

const title = document.querySelector("h1");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNew = document.querySelector(".btn--new");
const diceEl = document.querySelector(".dice");
// const scoreEl = document.querySelector(`.score--${activePlayer}`);
const score1El = document.querySelector(".score--0");
const score2El = document.querySelector(".score--1");
const player1 = document.querySelector(".player--0");
const player2 = document.querySelector(".player--1");
const leftContainer = document.querySelector(".left-container");
const rightContainer = document.querySelector(".right-container");

const generateRoll = function () {
  diceRoll = Number(Math.floor(Math.random() * 6 + 1));
  currentScore += diceRoll;
};
const diceDisplay = function () {
  diceEl.src = `/img/dice--${diceRoll}.png`;
};
const switchPlayer = function () {
  player1.classList.toggle("active--player");
  player2.classList.toggle("active--player");
  leftContainer.classList.toggle("active");
  rightContainer.classList.toggle("active");

  if (player2.classList.contains("active--player")) {
    activePlayer = 1;
  } else activePlayer = 0;
};
const resetScore = function () {
  currentScore = 0;
  score1El.textContent = currentScore;
  score2El.textContent = currentScore;
  player1.textContent = p1TotalScore;
  player2.textContent = p2TotalScore;
  player1.classList.remove("winner");
  player2.classList.remove("winner");
  p1TotalScore = 0;
  p2TotalScore = 0;
  isGame = true;
  title.textContent = "Lucky";
};
btnRoll.addEventListener("click", function () {
  if (isGame) {
    generateRoll();
    diceDisplay();

    if (diceRoll === 1) {
      switchPlayer();
      currentScore = 0;
      score1El.textContent = currentScore;
      score2El.textContent = currentScore;
    } else if (activePlayer === 0) {
      score1El.textContent = currentScore;
    } else if (activePlayer === 1) {
      score2El.textContent = currentScore;
    }
    console.log(
      `Player ${activePlayer + 1}`,
      `rolled ${diceRoll}`,
      `with a total score of ${currentScore}`
    );
  }
});
btnHold.addEventListener("click", function () {
  if (isGame) {
    if (activePlayer === 0) {
      p1TotalScore += currentScore;
      player1.textContent = p1TotalScore;
      if (p1TotalScore >= 20) {
        player1.classList.add("winner");
        isGame = false;
        title.textContent = "Player 1 Wins!";
      }
    } else if (activePlayer === 1) {
      p2TotalScore += currentScore;
      player2.textContent = p2TotalScore;
      if (p2TotalScore >= 20) {
        player2.classList.add("winner");
        isGame = false;
        title.textContent = "Player 2 Wins!";
      }
    }
    currentScore = 0;
    score1El.textContent = currentScore;
    score2El.textContent = currentScore;
    switchPlayer();
  }
});
btnNew.addEventListener("click", function () {
  resetScore();
  player1.textContent = currentScore;
  player2.textContent = currentScore;
});
resetScore();
