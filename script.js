// Initialize the game by generating a random number and setting attempts to zero
let randomNumber = generateRandomNumber();
let attempts = 0;
const maxAttempts = 5; // Maximum number of guesses allowed

// Function to generate a random number between 1 and 100
function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

// Function to update the feedback message (e.g., whether the guess is too high or too low)
function updateFeedback(message, isError = false) {
    const feedback = document.querySelector('.feedback');
    feedback.textContent = message;
    // Set feedback color: red for errors, green for success
    feedback.style.color = isError ? '#ff0000' : '#28a745';
}

// Function to update the attempts display
function updateAttemptsDisplay() {
    const attemptsDisplay = document.querySelector('.attempts');
    attemptsDisplay.textContent = `You have made ${attempts} attempt${attempts !== 1 ? 's' : ''}. ${maxAttempts - attempts} attempt${(maxAttempts - attempts) !== 1 ? 's' : ''} left.`;
}

// Function to reset the game to its initial state
function resetGame() {
    // Generate a new random number and reset attempts
    randomNumber = generateRandomNumber();
    attempts = 0;
    // Clear feedback and attempts display
    updateFeedback('');
    updateAttemptsDisplay();
    // Clear input field and re-enable guess button
    document.getElementById('guessInput').value = '';
    document.getElementById('guessButton').disabled = false;
    // Hide the restart button and focus on the input field
    document.getElementById('restartButton').classList.add('hidden');
    document.getElementById('guessInput').focus();
}

// Function to handle the user's guess
function handleGuess() {
    const guessInput = document.getElementById('guessInput');
    const userGuess = parseInt(guessInput.value.trim(), 10);

    // Validate the input: Check if it's a number and within the valid range
    if (isNaN(userGuess)) {
        updateFeedback('Please enter a valid number.', true);
        return;
    }
    if (userGuess < 1 || userGuess > 100) {
        updateFeedback('Number must be between 1 and 100.', true);
        return;
    }

    // Increment the attempt count and update the display
    attempts++;
    updateAttemptsDisplay();

    // Check if the user's guess is correct, too high, or too low
    if (userGuess === randomNumber) {
        updateFeedback(`🎉 Congratulations! You guessed the correct number (${randomNumber}) in ${attempts} attempt${attempts !== 1 ? 's' : ''}.`);
        // Show the restart button and disable the guess button
        document.getElementById('restartButton').classList.remove('hidden');
        document.getElementById('guessButton').disabled = true;
    } else if (attempts >= maxAttempts) {
        updateFeedback(`😔 Sorry, you've used all ${maxAttempts} attempts. The number was ${randomNumber}.`, true);
        // Show the restart button and disable the guess button
        document.getElementById('restartButton').classList.remove('hidden');
        document.getElementById('guessButton').disabled = true;
    } else if (userGuess < randomNumber) {
        updateFeedback('🔼 Your guess is too low.');
    } else {
        updateFeedback('🔽 Your guess is too high.');
    }

    // Clear the input field and focus it for the next guess
    guessInput.value = '';
    guessInput.focus();
}

// Event listener for the "Check" button to handle the guess when clicked
document.getElementById('guessButton').addEventListener('click', handleGuess);

// Event listener for the "Restart Game" button to reset the game when clicked
document.getElementById('restartButton').addEventListener('click', resetGame);

// Event listener for the "Enter" key in the input field to trigger the guess
document.getElementById('guessInput').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        handleGuess();
    }
});

// Initialize the attempts display on page load
updateAttemptsDisplay();
