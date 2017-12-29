const expect = require('chai').expect;
const fs = require('fs');
const KnotHash = require('./knotHash');

const { knotHash, verify } = KnotHash;

describe('KnotHash', () => {
  it('evaluates the hash', () => {
    expect(knotHash('3, 4, 1, 5', 5)).to.deep.equal([3, 4, 2, 1, 0]);
    expect(verify(knotHash('3, 4, 1, 5', 5))).to.equal(12);
  });

  it('evaluates the hash from puzzle input', () => {
    expect(verify(knotHash('106,16,254,226,55,2,1,166,177,247,93,0,255,228,60,36'))).to.equal(11413);
  });
});
