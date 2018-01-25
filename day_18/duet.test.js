const expect = require('chai').expect;
const fs = require('fs');

const Duet = require('./duet').Duet;

describe('Duet', () => {
  it('gets last frequency', () => {
    expect(new Duet('input/example_01.txt').lastFrequency).to.equal(4);
    expect(new Duet('input/example_02.txt').lastFrequency).to.equal(7071);
  });
});
