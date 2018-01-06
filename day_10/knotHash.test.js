const expect = require('chai').expect;
const fs = require('fs');
const KnotHash = require('./knotHash');

const {
  encode,
  evaluateRound,
  getDenseHash,
  knotHash,
  verify,
} = KnotHash;

describe('KnotHash', () => {
  it('evaluates the hash', () => {
    const list = Array.from(Array(5).keys());
    expect(evaluateRound([3, 4, 1, 5], list).sparseHash).to.deep.equal([3, 4, 2, 1, 0]);
    expect(verify(evaluateRound([3, 4, 1, 5], list).sparseHash)).to.equal(12);
  });

  it('evaluates the hash from puzzle input', () => {
    const list = Array.from(Array(256).keys());
    expect(verify(evaluateRound([106,16,254,226,55,2,1,166,177,247,93,0,255,228,60,36], list).sparseHash)).to.equal(11413);
  });

  it('encodes the input', () => {
    expect(encode('1,2,3')).to.deep.equal([49,44,50,44,51,17,31,73,47,23]);
  });

  it('creates the dense hash', () => {
    const array = [65, 27, 9, 1, 4, 3, 40, 50, 91, 7, 6, 0, 2, 5, 68, 22];
    expect(getDenseHash(array)).to.deep.equal([64]);
    expect(getDenseHash([...array, ...array, ...array, ...array])).to.deep.equal([64, 64, 64, 64]);
  });

  it('evaluates the knot hash', () => {
    expect(knotHash('')).to.equal('a2582a3a0e66e6e86e3812dcb672a272');
    expect(knotHash('AoC 2017')).to.equal('33efeb34ea91902bb2f59c9920caa6cd');
    expect(knotHash('1,2,3')).to.equal('3efbe78a8d82f29979031a4aa0b16a9d');
    expect(knotHash('1,2,4')).to.equal('63960835bcdc130f0b66d7ff4f6a5a8e');
    expect(knotHash('106,16,254,226,55,2,1,166,177,247,93,0,255,228,60,36')).to.equal('63960835bcdc130f0b66d7ff4f6a5a8e');
  });
});
