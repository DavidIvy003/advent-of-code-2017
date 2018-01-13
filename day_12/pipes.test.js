const expect = require('chai').expect;
const Pipes = require('./pipes');

const {
  countCommunicationGroups,
  getCommunicationGroup,
} = Pipes;

describe('Pipes', () => {
  it('returns the communication group', () => {
    expect(getCommunicationGroup('input/example_01.txt', '0').length).to.equal(6);
    expect(getCommunicationGroup('input/example_02.txt', '0').length).to.equal(175);
  });

  it('returns the number of groups', () => {
    expect(countCommunicationGroups('input/example_01.txt')).to.equal(2);
    expect(countCommunicationGroups('input/example_02.txt')).to.equal(213);
  });
});
