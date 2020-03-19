const chai = require('chai');
const expect = chai.expect;

const Card = require('../src/Card');
const Turn = require('../src/Turn');
const Deck = require('../src/Deck');
const Round = require('../src/Round');

describe('Round', function() {
  it('should be a function', function() {
    const round = new Round();
    expect(Round).to.be.a('function');
  });

  it('should be an instance of Round', function() {
    const round = new Round();
    expect(round).to.be.an.instanceof(Round);
  });

  it('should take a deck as an argument', function() {
    const card1 = new Card (1, "What allows you to define a set of related information using key-value pairs?", ["object", "array", "function"], "object");
    const card2 = new Card(2, "What is a comma-separated list of related values?", ["array", "object", "function"], "array");
    const card3 = new Card(3, "What type of prototype method directly modifies the existing array?", ["mutator method", "accessor method", "iteration method"], "mutator method");
    const deck = new Deck([card1, card2, card3]);
    const round = new Round(deck);
    expect(round.deck).to.deep.equal(deck);
  });

  it('should return the current card', function() {
    const card1 = new Card (1, "What allows you to define a set of related information using key-value pairs?", ["object", "array", "function"], "object");
    const card2 = new Card(2, "What is a comma-separated list of related values?", ["array", "object", "function"], "array");
    const card3 = new Card(3, "What type of prototype method directly modifies the existing array?", ["mutator method", "accessor method", "iteration method"], "mutator method");
    const deck = new Deck([card1, card2, card3]);
    const round = new Round(deck);
    let cardInPlay = round.returnCurrentCard();
    expect(cardInPlay).to.deep.equal(card1)
  });

  it('should update turns count', function() {
    const card1 = new Card (1, "What allows you to define a set of related information using key-value pairs?", ["object", "array", "function"], "object");
    const card2 = new Card(2, "What is a comma-separated list of related values?", ["array", "object", "function"], "array");
    const card3 = new Card(3, "What type of prototype method directly modifies the existing array?", ["mutator method", "accessor method", "iteration method"], "mutator method");
    const deck = new Deck([card1, card2, card3]);
    const round = new Round(deck);
    round.takeTurn('object', card1);
    expect(round.turns).to.equal(1)
  });

  it('should give feedback', function() {
    const card1 = new Card (1, "What allows you to define a set of related information using key-value pairs?", ["object", "array", "function"], "object");
    const card2 = new Card(2, "What is a comma-separated list of related values?", ["array", "object", "function"], "array");
    const card3 = new Card(3, "What type of prototype method directly modifies the existing array?", ["mutator method", "accessor method", "iteration method"], "mutator method");
    const deck = new Deck([card1, card2, card3]);
    const round = new Round(deck);
    round.returnCurrentCard();
    expect(round.takeTurn('object', card1)).to.equal('Correct!')
  });

  it('should store ids of incorrect guesses', function() {
    const card1 = new Card (1, "What allows you to define a set of related information using key-value pairs?", ["object", "array", "function"], "object");
    const card2 = new Card(2, "What is a comma-separated list of related values?", ["array", "object", "function"], "array");
    const card3 = new Card(3, "What type of prototype method directly modifies the existing array?", ["mutator method", "accessor method", "iteration method"], "mutator method");
    const deck = new Deck([card1, card2, card3]);
    const round = new Round(deck);
    round.takeTurn('array', card1);
    expect(round.incorrectGuesses[0]).to.deep.equal(1)
  });

  it('should calculate the percent of correct guesses', function() {
    const card1 = new Card (1, "What allows you to define a set of related information using key-value pairs?", ["object", "array", "function"], "object");
    const card2 = new Card(2, "What is a comma-separated list of related values?", ["array", "object", "function"], "array");
    const card3 = new Card(3, "What type of prototype method directly modifies the existing array?", ["mutator method", "accessor method", "iteration method"], "mutator method");
    const deck = new Deck([card1, card2, card3]);
    const round = new Round(deck);
    round.takeTurn('object', card1);
    round.takeTurn('array', card2);
    round.takeTurn('mutator method', card3);
    expect(round.calculatePercentCorrect()).to.equal(100);
  });

  it('should notify user when round ends', function() {
    const card1 = new Card (1, "What allows you to define a set of related information using key-value pairs?", ["object", "array", "function"], "object");
    const card2 = new Card(2, "What is a comma-separated list of related values?", ["array", "object", "function"], "array");
    const card3 = new Card(3, "What type of prototype method directly modifies the existing array?", ["mutator method", "accessor method", "iteration method"], "mutator method");
    const deck = new Deck([card1, card2, card3]);
    const round = new Round(deck);
    round.returnCurrentCard();
    round.takeTurn('object', card1);
    round.takeTurn('array', card2);
    round.takeTurn('iterator method', card3);
    expect(round.calculatePercentCorrect()).to.equal(66.67);
    expect(round.endRound()).to.equal('** Round over! ** You answered 66.67% of the questions correctly!')
  });
});
