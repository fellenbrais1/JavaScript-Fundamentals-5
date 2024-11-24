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

// To add eventlisteners we first specify the element to apply this to by using 'querySelector(selector).addEventListener()' In the parentheses for the addEventListener we first specify the event in quotes, we can see a list come up on an IDE of the options, and then we can run a function etc. after that, so something like: 'querySelector('.check').addEventListener('click', () => {})' We specify what happens between the curly braces as if it was a function.

// We can change the style of elements by using .style after we have specified querySelector and addEventListener if it is needed. So for example we could do something like 'querySelector('body').style.backgroundColor = '#60b347';'

// To store varibales in memory between page reloads there are a few different methods. In this project, I have stored them in session memory, so refreshing the page will keep the values, but closing down the browser session completely will wipe the data. There are also methods for using cookies to save the data to the users machine, or to save it to the website for use in future sessions.

// To save and load this session data I have used the 'sessionStorage.setItem('itemName', variable)' and 'sessionStorage.getItem('itemName')' methods, these can also be attached to querySelectors or addEventListeners.

'use strict';

// Configurable consts
const low = 1;
const high = 20;

document.querySelector('.between').textContent = `(Between ${low} and ${high})`;

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const setNumber = function () {
      const correctNumber = Math.trunc(Math.random() * high + 1);
      console.clear;
      console.log(correctNumber);
      return correctNumber;
    };

    let testDecimal = 1.1;
    console.log(typeof testDecimal);
    let gameScore = 20;

    document.querySelector(
      '.label-score'
    ).textContent = `💯 Score: ${gameScore}`;

    let highScore = sessionStorage.getItem('highScore');
    let prevScore;

    if (highScore === null) {
      highScore = 0;
      prevScore = 0;
    } else {
      prevScore = highScore;
    }

    let highScoreString = `🥇 Highscore: ${highScore}`;

    document.querySelector('.label-highscore').textContent = highScoreString;

    const gameLogic = function (correctNumber) {
      let guess;

      const checkGuess = () => {
        // guess = Number(prompt('What is your guess?'));
        guess = Number(document.querySelector('.guess').value);

        if (isNaN(guess)) {
          // console.log(`Please enter a number between ${low} and ${high}.`);
          document.querySelector(
            '.message'
          ).textContent = `Please enter a number between ${low} and ${high}.`;
          // setTimeout(checkGuess, 0); // Schedule the next check
          return;
        }

        if (guess % 1 !== 0) {
          // console.log(`Please enter a number between ${low} and ${high}.`);
          document.querySelector(
            '.message'
          ).textContent = `Please enter a number between ${low} and ${high}.`;
          // setTimeout(checkGuess, 0); // Schedule the next check
          return;
        }

        console.log(`You guessed ${guess}...`);

        if (guess < low || guess > high) {
          // console.log(`Please enter a number between ${low} and ${high}.`);
          document.querySelector(
            '.message'
          ).textContent = `Please enter a number between ${low} and ${high}.`;
          // setTimeout(checkGuess, 0); // Schedule the next check
          return;
        }

        if (guess === correctNumber) {
          // console.log('Correct! You win!');
          document.querySelector('body').style.backgroundColor = '#60b347';
          document.querySelector('.message').textContent = 'Correct Number!';
          document.querySelector('.number').textContent = correctNumber;
          let finalScore = gameScore;

          let saveScore = calcHighestScore(prevScore, finalScore);
          sessionStorage.setItem('highScore', saveScore);
          document.querySelector(
            '.label-score'
          ).textContent = `🎉 Score: ${gameScore}`;
          let highScoreString = `🥇 Highscore: ${saveScore}`;
          document.querySelector('.label-highscore').textContent =
            highScoreString;
        } else if (guess > correctNumber) {
          // console.log('You guessed too high!');
          document.querySelector('.message').textContent =
            '📈 You guessed too high!';
          gameScore--;
          document.querySelector(
            '.label-score'
          ).textContent = `💯 Score: ${gameScore}`;
          return;
          // setTimeout(checkGuess, 0); // Schedule the next check
        } else {
          // console.log('You guessed too low!');
          document.querySelector('.message').textContent =
            '📉 You guessed too low!';
          gameScore--;
          document.querySelector(
            '.label-score'
          ).textContent = `💯 Score: ${gameScore}`;
          return;
          // setTimeout(checkGuess, 0); // Schedule the next check
        }
      };

      checkGuess();
    };

    const correctNumber = setNumber();

    document.querySelector('.check').addEventListener('click', () => {
      gameLogic(correctNumber);
    });
  }, 0);
});

const calcHighestScore = function (highScore, newHighScore) {
  if (newHighScore > highScore) {
    highScore = newHighScore;
  }

  return highScore;
};

// We can use querySelector with a selector specified within the parentheses. This should print the associated HTML element in the console. If we want only to get the text content of an element we can add '.textContent' after the parentheses to only log that to the console.
console.log(document.querySelector('.message').textContent);

console.log(document.querySelector('.message').textContent);

document.querySelector('.again').addEventListener('click', () => {
  window.location.reload();
});
