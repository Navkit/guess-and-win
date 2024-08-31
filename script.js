// script.js

// Initialize the game by generating a random number and setting attempts to zero
let randomNumber = generateRandomNumber();
let attempts = 0;

// Function to generate a random number between 1 and 100
function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

// Function to update the feedback message
function updateFeedback(message, isError = false) {
    const feedback = document.querySelector('.feedback');
    feedback.textContent = message;
    feedback.style.color = isError ? '#ff0000' : '#28a745'; // Red for errors, green for success
}

// Function to update the attempts display
function updateAttemptsDisplay() {
    const attemptsDisplay = document.querySelector('.attempts');
    attemptsDisplay.textContent = `You have made ${attempts} attempt${attempts !== 1 ? 's' : ''}.`;
}

// Function to reset the game to its initial state
function resetGame() {
    randomNumber = generateRandomNumber();
    attempts = 0;
    updateFeedback(''); // Clear feedback
    updateAttemptsDisplay(); // Clear attempts
    document.getElementById('guessInput').value = ''; // Clear input field
    document.getElementById('guessButton').disabled = false; // Enable guess button
    document.getElementById('restartButton').classList.add('hidden'); // Hide restart button
    document.getElementById('guessInput').focus(); // Focus on input field
}

// Function to handle the user's guess
function handleGuess() {
    const guessInput = document.getElementById('guessInput');
    const userGuess = parseInt(guessInput.value.trim(), 10);

    // Validate the input
    if (isNaN(userGuess)) {
        updateFeedback('Please enter a valid number.', true);
        return;
    }
    if (userGuess < 1 || userGuess > 100) {
        updateFeedback('Number must be between 1 and 100.', true);
        return;
    }

    // Increment the attempt count
    attempts++;
    updateAttemptsDisplay();

    // Compare the guess with the random number and provide feedback
    if (userGuess === randomNumber) {
        updateFeedback(`🎉 Congratulations! You guessed the correct number (${randomNumber}) in ${attempts} attempt${attempts !== 1 ? 's' : ''}.`);
        document.getElementById('restartButton').classList.remove('hidden'); // Show restart button
        document.getElementById('guessButton').disabled = true; // Disable guess button
    } else if (userGuess < randomNumber) {
        updateFeedback('🔼 Your guess is too low.');
    } else {
        updateFeedback('🔽 Your guess is too high.');
    }

    // Clear the input field and focus it for the next guess
    guessInput.value = '';
    guessInput.focus();
}

// Event listener for the "Check" button
document.getElementById('guessButton').addEventListener('click', handleGuess);

// Event listener for the "Restart Game" button
document.getElementById('restartButton').addEventListener('click', resetGame);

// Event listener for the "Enter" key in the input field
document.getElementById('guessInput').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        handleGuess();
    }
});

// Initialize the attempts display on page load
updateAttemptsDisplay();
