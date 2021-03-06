const expect = require('chai').expect;
const recursiveCircus = require('./recursiveCircus');
const { createStructure, weightToFixUnbalance, getBottom } = recursiveCircus;

describe('recursiveCircus', () => {
  describe('getBottom', () => {
    it('gets the bottom node id for example input', () => {
      const graph = createStructure('input/example_01.txt');
      const bottom = getBottom(graph);
      expect(bottom).to.equal('tknk');
    });

    it('gets the bottom node id for puzzle input', () => {
      const graph = createStructure('input/example_02.txt');
      const bottom = getBottom(graph);
      expect(bottom).to.equal('vmpywg');
    });
  });

  describe('findUnbalancedProgram', () => {
    it('finds the difference of the unbalanced program for example input', () => {
      const graph = createStructure('input/example_01.txt');
      const value = weightToFixUnbalance(graph);
      expect(value).to.equal(60);
    });

    it('gets the bottom node id for puzzle input', () => {
      const graph = createStructure('input/example_02.txt');
      const value = weightToFixUnbalance(graph);
      expect(value).to.equal(1674);
    });
  });
});
