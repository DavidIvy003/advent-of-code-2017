const expect = require('chai').expect;
const DiskDefragmenter = require('./diskDefragmentation');

const {
  countBitsUsed,
} = DiskDefragmenter;

describe('DiskDefragmenter', () => {
  it('counts the bits used', () => {
    expect(countBitsUsed('flqrgnkx')).to.equal(8108);
    expect(countBitsUsed('ffayrhll')).to.equal(8190);
  }).timeout(10000);

  // it('returns the delay to not get caught', () => {
  //   expect(getDelayToAvoidCapture('input/example_01.txt')).to.equal(10);
  //   expect(getDelayToAvoidCapture('input/example_02.txt')).to.equal(3933124);
  // }).timeout(100000); // Takes about 39s to run
});
