const expect = require('chai').expect;
const fs = require('fs');

const Duet = require('./duet').duet;

describe('Duet', () => {
  it('finds the number of values sent by the second program', () => {
    const testInstructions = fs.readFileSync('input/example_03.txt').toString().split("\n");
    const puzzleInstructions = fs.readFileSync('input/example_02.txt').toString().split("\n");
    expect(Duet(testInstructions)).to.equal(3);
    expect(Duet(puzzleInstructions)).to.equal(8001);
  });
});
