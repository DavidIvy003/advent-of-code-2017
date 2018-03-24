const expect = require('chai').expect;
const fs = require('fs');

const {
  getPossibleBridges,
  getStrength,
  getStrongestBridge,
} = require('./dist/moat');

describe('Electromagnetic Moat', () => {
  describe('getPossibleBridges', () => {
    it('gets a list of all possible bridge', () => {
      const input = fs.readFileSync('input/example_01.txt').toString();
      const expected = [
        [[0, 2], [2, 2], [2, 3], [3, 4]],
        [[0, 2], [2, 2], [2, 3], [3, 5]],
        [[0, 2], [2, 3], [3, 4]],
        [[0, 2], [2, 3], [3, 5]],
        [[0, 1], [10, 1], [9, 10]]
      ];
      expect(getPossibleBridges(input)).to.deep.equal(expected);
    });
  });

  describe('getStrongestBridge', () => {
    it('sets the register', () => {
      const input = fs.readFileSync('input/example_01.txt').toString();
      const bridges = [
        [[0, 2], [2, 2], [2, 3], [3, 4]],
        [[0, 2], [2, 2], [2, 3], [3, 5]],
        [[0, 2], [2, 3], [3, 4]],
        [[0, 2], [2, 3], [3, 5]],
        [[0, 1], [10, 1], [9, 10]]
      ];
      expect(getStrongestBridge(bridges)).to.deep.equal([[0, 1], [10, 1], [9, 10]]);
    });
  });

  describe('getStrength', () => {
    it('sets the strength of the bridge', () => {
      const input = fs.readFileSync('input/example_01.txt').toString();
      expect(getStrength([[0, 2], [2, 2], [2, 3], [3, 4]])).to.deep.equal(18);
    });
  });

  describe('puzzle input', () => {
    it('gets the strength of the strongest bridge from puzzle input', () => {
      const input = fs.readFileSync('input/puzzle_input.txt').toString();
      const bridges = getPossibleBridges(input);
      const strongestBridge = getStrongestBridge(bridges);
      expect(getStrength(strongestBridge)).to.deep.equal(2006);
    });
  });
});


