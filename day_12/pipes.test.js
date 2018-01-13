const expect = require('chai').expect;
const Pipes = require('./pipes');

const {
  getCommunicationGroup,
} = Pipes;

describe('Pipes', () => {
  it('returns the communication group', () => {
    expect(getCommunicationGroup('input/example_01.txt', '0').length).to.equal(6);
    expect(getCommunicationGroup('input/example_02.txt', '0').length).to.equal(175);
  });
});
