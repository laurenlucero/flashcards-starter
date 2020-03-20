const Turn = require("./Turn");
const Card = require("./Card");
const Game = require("./Game");

class Round {
  // takes in responses, records guesses and if correct or Incorrect
  // currentCard should be the first Card in the Deck (array of Cards) at the start of the Round
  constructor(deck) {
    this.deck = deck;
    this.turns = 0;
    this.incorrectGuesses = [];
  }
  returnCurrentCard() {
    // returns current card being played
    // first Card in the Deck (array of Cards) at the start of Round
    return (this.currentCard = this.deck.cards[this.turns]);
  }
  takeTurn(guess) {
    // updates turns count, evaluates guesses, gives feedback, and stores ids of incorrect guesses
    // when a guess is made, new Turn instance is created and next card becomes current card
    let turn = new Turn(guess, this.deck.cards[this.turns]);
    turn.evaluateGuess();
    if (turn.guess !== turn.card.correctAnswer) {
      this.incorrectGuesses.push(this.deck.cards[this.turns].id);
    }
    this.turns++;
    return turn.giveFeedback();
  }
  calculatePercentCorrect() {
    // calculates and returns percentage of correct guesses
    let correct = this.turns - this.incorrectGuesses.length;
    let percentCorrect = (correct / this.turns) * 100;
    return Number(percentCorrect.toFixed(2));
  }
  endRound() {
    // prints '**Round over!** You answered <>% of the questions correctly'
    let percent = this.calculatePercentCorrect();
    if (percent > 90) {
      console.log(
        `** Round over! ** You answered ${percent}% of the questions correctly!`
      );
      return `** Round over! ** You answered ${percent}% of the questions correctly!`;
    } else {
      console.log(
        `** Round over! ** You answered ${percent}% of the questions correctly! Play again to get at least 90% correct.`
      );
      return `** Round over! ** You answered ${percent}% of the questions correctly! Play again to get at least 90% correct.`;
      const game = new Game();
      game.start();
    }
  }
}

module.exports = Round;
