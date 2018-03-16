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
        nodes: {
          '-1,0': { health: 'INFECTED' }, 
          '1,1': { health: 'INFECTED' }, 
          '0,0': { health: 'INFECTED' }, 
        },
        direction: 'LEFT',
        current: { x: -1, y: 0 },
        stats: {
          infections: 1,
        },
      }
      expect(getVirusStateAfterIterations(testInstructions, 1)).to.deep.equal(expected);
    });

    it('gets the state after 5 iteration', () => {
      const testInstructions = fs.readFileSync('input/example_01.txt').toString();
      const expected = {
        nodes: {
          '1,1': { health: 'INFECTED' },
          '0,0': { health: 'INFECTED' },
          '-2,1': { health: 'INFECTED' },
          '-2,0': { health: 'INFECTED' },
          '-1,0': { health: 'INFECTED' },
        },
        direction: 'RIGHT',
        current: { x: 0, y: 1 },
        stats: {
          infections: 5,
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
      expect(output.stats.infections).to.deep.equal(5182);
    });

    it('counts the infections of 10000 iterations', () => {
      const testInstructions = fs.readFileSync('input/example_01.txt').toString();
      const output = getVirusStateAfterIterations(testInstructions, 100, true);
      expect(output.stats.infections).to.deep.equal(26);
    });

    it('counts the infections of 10000000 iterations of puzzle input which evolves', () => {
      const testInstructions = fs.readFileSync('input/example_01.txt').toString();
      const output = getVirusStateAfterIterations(testInstructions, 10000000, true);
      expect(output.stats.infections).to.deep.equal(2511944);
    }).timeout(10000);

    it('counts the infections of 10000000 iterations of puzzle input which evolves', () => {
      const testInstructions = fs.readFileSync('input/puzzle_input.txt').toString();
      const output = getVirusStateAfterIterations(testInstructions, 10000000, true);
      expect(output.stats.infections).to.deep.equal(2512008);
    }).timeout(10000);
  });
});


