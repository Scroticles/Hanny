const words = ["javascript", "developer", "hangman", "website", "coding"];
let selectedWord = words[Math.floor(Math.random() * words.length)];
let guessedLetters = new Set();
let wrongGuesses = 0;
const maxWrongGuesses = 6;

const wordDisplay = document.getElementById("word-display");
const wrongGuessesDisplay = document.getElementById("wrong-guesses");
const message = document.getElementById("message");
const lettersContainer = document.getElementById("letters");

// Display word as underscores
function updateWordDisplay() {
    wordDisplay.textContent = selectedWord.split("").map(letter => guessedLetters.has(letter) ? letter : "_").join(" ");
}

// Check if the game is won
function checkWin() {
    if (!wordDisplay.textContent.includes("_")) {
        message.textContent = "🎉 You Won! The word was: " + selectedWord;
        disableButtons();
    }
}

// Check if the game is lost
function checkLoss() {
    if (wrongGuesses >= maxWrongGuesses) {
        message.textContent = "❌ Game Over! The word was: " + selectedWord;
        disableButtons();
    }
}

// Handle letter guess
function handleGuess(letter) {
    if (guessedLetters.has(letter)) return;
    guessedLetters.add(letter);

    if (selectedWord.includes(letter)) {
        updateWordDisplay();
        checkWin();
    } else {
        wrongGuesses++;
        wrongGuessesDisplay.textContent = wrongGuesses;
        checkLoss();
    }
}

// Disable all letter buttons
function disableButtons() {
    document.querySelectorAll("button.letter").forEach(btn => btn.disabled = true);
}

// Create letter buttons
function createLetterButtons() {
    for (let i = 65; i <= 90; i++) {
        let letter = String.fromCharCode(i).toLowerCase();
        let button = document.createElement("button");
        button.textContent = letter;
        button.classList.add("letter");
        button.onclick = () => handleGuess(letter);
        lettersContainer.appendChild(button);
    }
}

// Initialize game
updateWordDisplay();
createLetterButtons();
