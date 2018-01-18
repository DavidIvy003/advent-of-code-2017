const expect = require('chai').expect;
const Generators = require('./generators');

const {
  countMatchedSequences,
} = Generators;

describe('Generators', () => {
  it('counts the matched sequences', () => {
    expect(countMatchedSequences(65, 8921)).to.equal(588);
    expect(countMatchedSequences(277, 349)).to.equal(592);
  }).timeout(30000); // Takes a long time to run
});
