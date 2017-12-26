const expect = require('chai').expect;
const fs = require('fs');
const Stream = require('./stream');
const { streamScore } = Stream;

describe('registers', () => {
  describe('modifyRegisters', () => {
    it('builds the registers from an input value', () => {
      expect(streamScore('{}')).to.equal(1);
      expect(streamScore('{{}}')).to.equal(3);
      expect(streamScore('{{{}}}')).to.equal(6);
      expect(streamScore('{{},{}}')).to.equal(5);
      expect(streamScore('{{{},{},{{}}}}')).to.equal(16);
    });

    it('filters garbage', () => {
      expect(streamScore('{<>}')).to.equal(1);
      expect(streamScore('{{<random characters>}}')).to.equal(3);
      expect(streamScore('{<{},{},{{}}>}')).to.equal(1);
      expect(streamScore('{<a>,<a>,<a>,<a>}')).to.equal(1);
      expect(streamScore('{{<a!>},{<a!>},{<a!>},{<ab>}}')).to.equal(3);
      expect(streamScore('{{<{!>}>},{<!!>}}')).to.equal(5);
      expect(streamScore('{{{<<<<>}}}')).to.equal(6);
      expect(streamScore('{{<ab>},{<ab>},{<ab>},{<ab>}}')).to.equal(9);
      expect(streamScore('{{<!!>},{<!!>},{<!!>},{<!!>}}')).to.equal(9);
      expect(streamScore('{{{},{<!!!>>},{{<{o"i!a,<{i<a>}}}}')).to.equal(16);
    });

    it('scores the puzzle input', () => {
      const input = fs.readFileSync('input/puzzle_input.txt').toString().trim();
      expect(streamScore(input)).to.equal(21037);
    });
  });
});
