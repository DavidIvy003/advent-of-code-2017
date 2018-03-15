const expect = require('chai').expect;
const fs = require('fs');

const {
  getVirusStateAfterIterations,
} = require('./dist/virus');

describe('Sporifica Virus', () => {
  describe('getVirusStateAfterIterations', () => {
    it('gets the state after 1 iteration', () => {
      const testInstructions = fs.readFileSync('input/example_01.txt').toString();
      const expected = {
        nodes: [
          { position: { x: -1, y: 0 }}, 
          { position: { x: 1, y: 1 }},
          { position: { x: 0, y: 0 } },
        ],
        direction: 'LEFT',
        current: { x: -1, y: 0 },
        stats: {
          infections: 1,
          cleans: 0,
        },
      }
      expect(getVirusStateAfterIterations(testInstructions, 1)).to.deep.equal(expected);
    });

    it('gets the state after 5 iteration', () => {
      const testInstructions = fs.readFileSync('input/example_01.txt').toString();
      const expected = {
        nodes: [
          { position: { x: 1, y: 1 }},
          { position: { x: 0, y: 0 } },
          { position: { x: -2, y: 1 } }, 
          { position: { x: -2, y: 0 } }, 
          { position: { x: -1, y: 0 } }, 
        ],
        direction: 'RIGHT',
        current: { x: 0, y: 1 },
        stats: {
          infections: 5,
          cleans: 2,
        },
      }
      expect(getVirusStateAfterIterations(testInstructions, 7)).to.deep.equal(expected);
    });

    it('counts the infections of 70 iterations', () => {
      const testInstructions = fs.readFileSync('input/example_01.txt').toString();
      const output = getVirusStateAfterIterations(testInstructions, 70);
      expect(output.stats.infections).to.deep.equal(41);
    });

    it('counts the infections of 10000 iterations', () => {
      const testInstructions = fs.readFileSync('input/example_01.txt').toString();
      const output = getVirusStateAfterIterations(testInstructions, 10000);
      expect(output.stats.infections).to.deep.equal(5587);
    });

    it('counts the infections of 10000 iterations of puzzle input', () => {
      const testInstructions = fs.readFileSync('input/puzzle_input.txt').toString();
      const output = getVirusStateAfterIterations(testInstructions, 10000);
      expect(output.stats.infections).to.deep.equal(5587);
    });
  });
});


