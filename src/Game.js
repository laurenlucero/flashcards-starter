// data
const data = require("./data");
const prototypeQuestions = data.prototypeData;
const util = require("./util");

const Deck = require("./Deck");
const Round = require("./Round");

// should keep track of the currentRound
class Game {
  constructor() {
    this.currentRound = null;
  }
  printMessage(deck) {
    console.log(`Welcome to FlashCards! You are playing with ${deck.countCards()} cards.
-----------------------------------------------------------------------`);
  }
  printQuestion(round) {
    util.main(round);
  }
  start() {
    // starts everything
    // creates Cards
    // puts Cards in a Deck
    // creates new Round using the Deck
    const deck = new Deck(prototypeQuestions);
    const round = new Round(deck);
    this.currentRound = round;
    this.printMessage(deck);
    this.printQuestion(round);
  }
}

module.exports = Game;
