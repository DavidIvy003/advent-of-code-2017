const expect = require('chai').expect;
const DiskDefragmenter = require('./diskDefragmentation');

const {
  countBitsUsed,
  countRegions,
} = DiskDefragmenter;

describe('DiskDefragmenter', () => {
  it('counts the bits used', () => {
    expect(countBitsUsed('flqrgnkx')).to.equal(8108);
    expect(countBitsUsed('ffayrhll')).to.equal(8190);
  }).timeout(10000);

  it('counts the regions', () => {
    expect(countRegions('flqrgnkx')).to.equal(1242);
    expect(countRegions('ffayrhll')).to.equal(1134);
  }).timeout(100000); // Takes about 39s to run
});
