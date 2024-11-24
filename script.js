// DOM Manipulation

// DOM stands for Document Object Model, it is a structured representation of HTML documents that allows JavaScript to access HTML elements and styles to manipulate them.

// The DOM is created as soon as a page loads and is stored as a tree structure of elements/ scripts etc. on the page. This includes elements which are all one objct, their css and other properties, and their interactions with JavaScript scripts.

// We use the terms child, parent, sibling etc. element when talking about the DOM tree. We can interact with each of the nodes on the tree by using DOM manipulation.

// At the top of the tree is the document object, which is at the top-level of the DOM, making it our entry point to the DOM and the elements within it.

// The html is a child element of the document.

// The head and body elements are child elements of the html, and so it goes deeper and deeper.

// Element nodes also have child nodes for their text content/ comments etc. so we can manipulate whatever is in the DOM in our scripts.

// DOM manipulation is not actually JavaScript, JavaScript is just a dialect of the ECMA script specification, but DOM manipulation is not in it. To manipulate web pages displayed in the browser, we use the web APIs to do this. These are Application Programming Interfaces that we can access from JavaScript.

// Each browser specifies the same DOM protocols, so things should work the same no matter what browser you are hosting your html and code on.

// By using the document.querySelector() we can select elements on the page by their class, ID, or name if they are a normal element like body. From here we can use '.textContent' to capture the content of an element, or change this content with '.textContent =' to change their content, '.value' to get the value of a number etc., and '.value =' to change this value.

// We can use querySelector with a selector specified within the parentheses. This should print the associated HTML element in the console. If we want only to get the text content of an element we can add '.textContent' after the parentheses to only log that to the console.

// To add eventlisteners we first specify the element to apply this to by using 'querySelector(selector).addEventListener()' In the parentheses for the addEventListener we first specify the event in quotes, we can see a list come up on an IDE of the options, and then we can run a function etc. after that, so something like: 'querySelector('.check').addEventListener('click', () => {})' We specify what happens between the curly braces as if it was a function. If we define the function within the parentheses as an expression it will not be stored anywhere but will be called when the eventListener goes off.

// We can change the style of elements by using .style after we have specified querySelector and addEventListener if it is needed. So for example we could do something like 'querySelector('body').style.backgroundColor = '#60b347';'

// To store variables in memory between page reloads there are a few different methods. In this project, I have stored them in session memory, so refreshing the page will keep the values, but closing down the browser session completely will wipe the data. There are also methods for using cookies to save the data to the users machine, or to save it to the website for use in future sessions.

// To save and load this session data I have used the 'sessionStorage.setItem('itemName', variable)' and 'sessionStorage.getItem('itemName')' methods, these can also be attached to querySelectors or addEventListeners.

'use strict';

// Configurable consts
const LOW = 1;
const HIGH = 100;

// Changes the text content in the '.between' element at the top of the page based on the low and high values specified above
document.querySelector('.between').textContent = `(Between ${LOW} and ${HIGH})`;

// Allows the gameLogic and code to be run only after all of the visual elements on the page have been successfully loaded
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const setNumber = function () {
      const correctNumber = Math.trunc(Math.random() * HIGH + 1);
      console.clear;
      console.log(correctNumber);
      return correctNumber;
    };

    // Sets the content of the score field on the page
    let gameScore = 20;
    document.querySelector(
      '.label-score'
    ).textContent = `💯 Score: ${gameScore}`;

    // Loads any stored highScore value in the web session
    let highScore = sessionStorage.getItem('highScore');
    let prevScore;

    // If there is no saved highScore value in the web session, the scores are set to 0 so they can be overwritten when there is some data
    if (highScore === null) {
      highScore = 0;
      prevScore = 0;
    } else {
      prevScore = highScore;
    }

    // Sets the content for the highscore field of the page
    let highScoreString = `🥇 Highscore: ${highScore}`;
    document.querySelector('.label-highscore').textContent = highScoreString;

    // Function containing the gameLogic to allow the game to process numbers correctly
    const gameLogic = function (correctNumber) {
      let guess;

      const checkGuess = () => {
        guess = Number(document.querySelector('.guess').value);

        // To not allow guesses that contain text values etc.
        if (isNaN(guess)) {
          document.querySelector(
            '.message'
          ).textContent = `Please enter a number between ${LOW} and ${HIGH}.`;
          return;
        }

        // To not allow guesses containing a decimal point
        if (guess % 1 !== 0) {
          document.querySelector(
            '.message'
          ).textContent = `Please enter a number between ${LOW} and ${HIGH}.`;
          return;
        }

        // Allows processing of numbers lower than the specified low or higher than the specified high
        if (guess < LOW || guess > HIGH) {
          document.querySelector(
            '.message'
          ).textContent = `Please enter a number between ${LOW} and ${HIGH}.`;
          return;
        }

        // If the guess is correct
        if (guess === correctNumber) {
          // Changes the style of the page's body
          document.querySelector('body').style.backgroundColor = '#60b347';

          // Sets the content on the rest of the page
          document.querySelector('.message').textContent = 'Correct Number!';
          document.querySelector('.number').textContent = correctNumber;
          document.querySelector(
            '.label-score'
          ).textContent = `🎉 Score: ${gameScore}`;

          // Calculates whether the new high score is better than the old one and saves the highest high score to the web session
          let finalScore = gameScore;
          let saveScore = calcHighestScore(prevScore, finalScore);
          sessionStorage.setItem('highScore', saveScore);

          let highScoreString = `🥇 Highscore: ${saveScore}`;
          document.querySelector('.label-highscore').textContent =
            highScoreString;

          // If the guess is too low
        } else if (guess > correctNumber) {
          document.querySelector('.message').textContent =
            '📈 You guessed too high!';
          gameScore--;
          document.querySelector(
            '.label-score'
          ).textContent = `💯 Score: ${gameScore}`;
          return;
        } else {
          // If the guess is too high
          document.querySelector('.message').textContent =
            '📉 You guessed too low!';
          gameScore--;
          document.querySelector(
            '.label-score'
          ).textContent = `💯 Score: ${gameScore}`;
          return;
        }
      };

      // Function call allows the gameLogic to keep running
      checkGuess();
    };

    const correctNumber = setNumber();

    // Runs the gameLogic function whenever the user clicks on the check button
    document.querySelector('.check').addEventListener('click', () => {
      gameLogic(correctNumber);
    });
  }, 0);
});

// Function to see if the newest highScore is better than the one already saved or not, and sets the saved score to the new one if it is better
const calcHighestScore = function (highScore, newHighScore) {
  if (newHighScore > highScore) {
    highScore = newHighScore;
  }

  return highScore;
};

// Allows the page to be reloaded and the game logic reset when the user clicks on the 'Again!' button
document.querySelector('.again').addEventListener('click', () => {
  window.location.reload();
});
