'use strict';

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    // Configurable consts
    const low = 1;
    const high = 20;

    const setNumber = function () {
      const correctNumber = Math.trunc(Math.random() * high + 1);
      console.clear;
      console.log(correctNumber);
      return correctNumber;
    };

    const gameLogic = function (correctNumber) {
      let guess;

      while (true) {
        guess = Number(prompt('What is your guess?'));
        console.log(`You guessed ${guess}...`);

        if (isNaN(guess)) {
          console.log(`Please enter a number between ${low} and ${high}.`);
        }

        if (guess < 1 || guess > 20) {
          console.log(`Please enter a number between ${low} and ${high}.`);
        } else {
          if (guess === correctNumber) {
            console.log('Correct! You win!');
            break;
          } else if (guess > correctNumber) {
            console.log('You guessed too high!');
          } else {
            console.log('You guessed too low!');
          }
        }
      }
    };

    const correctNumber = setNumber();
    gameLogic(correctNumber);
  }, 0);
});
