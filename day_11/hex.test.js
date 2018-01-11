const expect = require('chai').expect;
const fs = require('fs');
const Hex = require('./hex');

const {
  fastestTravelPath,
} = Hex;

describe('Hex', () => {
  it('returns the fastest travel path', () => {
    expect(fastestTravelPath('ne,ne,ne')).to.equal(3);
    expect(fastestTravelPath('ne,ne,sw,sw')).to.equal(0);
    expect(fastestTravelPath('ne,ne,s,s')).to.equal(2);
    expect(fastestTravelPath('se,sw,se,sw,sw')).to.equal(3);
    const input = fs.readFileSync('input/puzzle_input.txt').toString().trim();
    expect(fastestTravelPath(input)).to.equal(834);
  });
});
