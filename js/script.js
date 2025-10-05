/* Alberto Rodriguez
10-5-2025
Guess the Number Game
 */



// Event Listeners
document.querySelector("#resetBtn").addEventListener("click", initializeGame);
document.querySelector("#guessBtn").addEventListener("click", checkGuess);

// Globals
let randomNumber;
let attempts = 0;
let wins = 0;
let losses = 0;

initializeGame();

function initializeGame() {
  randomNumber = Math.floor(Math.random() * 99) + 1;
  attempts = 0;

  document.querySelector("#resetBtn").style.display = "none";
  document.querySelector("#guessBtn").style.display = "inline";

  const playerGuess = document.querySelector("#playerGuess");
  playerGuess.value = "";
  playerGuess.disabled = false;
  playerGuess.focus();

  const feedback = document.querySelector("#feedback");
  feedback.textContent = "";
  feedback.style.color = "";

  document.querySelector("#guesses").textContent = "";
  document.querySelector("#attemptCounter").textContent = "Attempt: 1 of 7";
}

function checkGuess() {
  const feedback = document.querySelector("#feedback");
  feedback.textContent = "";

  const raw = document.querySelector("#playerGuess").value.trim();
  const guess = Number(raw);

  if (!Number.isInteger(guess)) {
    feedback.textContent = "Please enter a whole number between 1 and 99.";
    feedback.style.color = "red";
    return;
  }
  if (guess < 1 || guess > 99) {
    feedback.textContent = "Enter a number between 1 and 99.";
    feedback.style.color = "red";
    return;
  }

  attempts++;

  if (guess === randomNumber) {
    feedback.textContent = "You guessed it! You Won!";
    feedback.style.color = "darkgreen";
    wins++;
    document.querySelector("#wins").textContent = "Wins: " + wins;
    gameOver();
    return;
  }

  document.querySelector("#guesses").textContent += (document.querySelector("#guesses").textContent ? " " : "") + guess;

  if (attempts === 7) {
    feedback.textContent = "Sorry, you lost! The number was " + randomNumber + ".";
    feedback.style.color = "red";
    losses++;
    document.querySelector("#losses").textContent = "Losses: " + losses;
    gameOver();
    return;
  }

  if (guess > randomNumber) {
    feedback.textContent = "Guess was high";
  } else {
    feedback.textContent = "Guess was low";
  }
  feedback.style.color = "orange";
  document.querySelector("#attemptCounter").textContent = "Attempt: " + (attempts + 1) + " of 7";
}

function gameOver() {
  const guessBtn = document.querySelector("#guessBtn");
  const resetBtn = document.querySelector("#resetBtn");
  const input = document.querySelector("#playerGuess");

  guessBtn.style.display = "none";
  resetBtn.style.display = "inline";
  input.disabled = true;
}
