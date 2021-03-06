const chai = require("chai");
const expect = chai.expect;

const Card = require("../src/Card");
const Turn = require("../src/Turn");

describe("Turn", function() {
  let card;
  let turn;
  beforeEach(function() {
    card = new Card(
      1,
      "What allows you to define a set of related information using key-value pairs?",
      ["object", "array", "function"],
      "object"
    );
    turn = new Turn("object", card);
  });

  it("should be a function", function() {
    expect(Turn).to.be.a("function");
  });

  it("should be an instance of Turn", function() {
    expect(turn).to.be.an.instanceof(Turn);
  });

  it("should take a guess", function() {
    expect(turn.guess).to.equal("object");
  });

  it("should take a card", function() {
    expect(turn.card.id).to.equal(1);
    expect(turn.card.question).to.equal(
      "What allows you to define a set of related information using key-value pairs?"
    );
  });

  it("should return a guess", function() {
    expect(turn.guess).to.equal("object");
    expect(turn.returnGuess("object"));
  });

  it("should return a card", function() {
    expect(turn.card.id).to.equal(1);
    expect(turn.returnCard(card));
  });

  it("should evaluate a guess as true or false", function() {
    expect(turn.evaluateGuess(true));
  });

  it("should give feedback on guess", function() {
    expect(turn.giveFeedback("Correct!"));
  });
});
