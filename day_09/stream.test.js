const expect = require('chai').expect;
const fs = require('fs');
const Stream = require('./stream');
const { streamScore } = Stream;

describe('registers', () => {
  describe('modifyRegisters', () => {
    it('builds the registers from an input value', () => {
      expect(streamScore('{}').score).to.equal(1);
      expect(streamScore('{{}}').score).to.equal(3);
      expect(streamScore('{{{}}}').score).to.equal(6);
      expect(streamScore('{{},{}}').score).to.equal(5);
      expect(streamScore('{{{},{},{{}}}}').score).to.equal(16);
    });

    it('filters garbage', () => {
      expect(streamScore('{<>}').score).to.equal(1);
      expect(streamScore('{{<random characters>}}').score).to.equal(3);
      expect(streamScore('{<{},{},{{}}>}').score).to.equal(1);
      expect(streamScore('{<a>,<a>,<a>,<a>}').score).to.equal(1);
      expect(streamScore('{{<a!>},{<a!>},{<a!>},{<ab>}}').score).to.equal(3);
      expect(streamScore('{{<{!>}>},{<!!>}}').score).to.equal(5);
      expect(streamScore('{{{<<<<>}}}').score).to.equal(6);
      expect(streamScore('{{<ab>},{<ab>},{<ab>},{<ab>}}').score).to.equal(9);
      expect(streamScore('{{<!!>},{<!!>},{<!!>},{<!!>}}').score).to.equal(9);
      expect(streamScore('{{{},{<!!!>>},{{<{o"i!a,<{i<a>}}}}').score).to.equal(16);
    });

    it('scores the puzzle input', () => {
      const input = fs.readFileSync('input/puzzle_input.txt').toString().trim();
      expect(streamScore(input).score).to.equal(21037);
    });

    it('counts the garbage size', () => {
      expect(streamScore('{<>}').garbageSize).to.equal(0);
      expect(streamScore('{{<random characters>}}').garbageSize).to.equal(17);
      expect(streamScore('{<{},{},{{}}>}').garbageSize).to.equal(10);
      expect(streamScore('{<a>,<a>,<a>,<a>}').garbageSize).to.equal(4);
      expect(streamScore('{{<a!>},{<a!>},{<a!>},{<ab>}}').garbageSize).to.equal(17);
      expect(streamScore('{{<{!>}>},{<!!>}}').garbageSize).to.equal(2);
      expect(streamScore('{{{<<<<>}}}').garbageSize).to.equal(3);
      expect(streamScore('{{<ab>},{<ab>},{<ab>},{<ab>}}').garbageSize).to.equal(8);
      expect(streamScore('{{<!!>},{<!!>},{<!!>},{<!!>}}').garbageSize).to.equal(0);
      expect(streamScore('{{{},{<!!!>>},{{<{o"i!a,<{i<a>}}}}').garbageSize).to.equal(10);
    });

    it('counts the garbage size for the puzzle input', () => {
      const input = fs.readFileSync('input/puzzle_input.txt').toString().trim();
      expect(streamScore(input).garbageSize).to.equal(9495);
    });
  });
});
