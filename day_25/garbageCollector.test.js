const expect = require('chai').expect;
const fs = require('fs');
const exampleInput = require('./input/example_01');
const puzzleInput = require('./input/puzzle_input');

const {
  getChecksum,
  getLastState,
} = require('./dist/garbageCollector');

describe('Garbage Collector', () => {
  describe('getLastState', () => {
    it('gets the state after incrementing test data 6 times', () => {
      const expected = {
        blueprints: exampleInput,
        activeState: 'A',
        position: 0,
        tape: {
          '-2': 1,
          '-1': 1,
          '0': 0,
          '1': 1,
        },
      };
      expect(getLastState(exampleInput, 6)).to.deep.equal(expected);
    });
  });

  describe('getChecksum', () => {
    it('gets the checksum of the state', () => {
      const input = {
        blueprints: exampleInput,
        activeState: 'A',
        position: 0,
        tape: {
          '-2': 1,
          '-1': 1,
          '0': 0,
          '1': 1,
        },
      };
      expect(getChecksum(input)).to.equal(3);
    });
  });

  describe('Puzzle Input', () => {
    it('gets the checksum after incrementing puzzle data 12172063 times', () => {
      const state = getLastState(puzzleInput, 12172063);
      expect(getChecksum(state)).to.equal(2474);
    }).timeout(20000);
  });
});


