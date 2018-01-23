const expect = require('chai').expect;
const fs = require('fs');

const Spinlock = require('./spinlock');

const {
  shortCircuit,
} = Spinlock;

describe('Spinlock', () => {
  it('processes instruction', () => {
    expect(shortCircuit(3)).to.equal(638);
    expect(shortCircuit(363)).to.equal(136);
  });
});
