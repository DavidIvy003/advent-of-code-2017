const expect = require('chai').expect;
const fs = require('fs');

const Spinlock = require('./spinlock');

const {
  valueAfterFirst,
  valueAfterLast,
} = Spinlock;

describe('Spinlock', () => {
  it('processes instruction', () => {
    expect(valueAfterLast(3)).to.equal(638);
    expect(valueAfterLast(363)).to.equal(136);
    expect(valueAfterLast(3, 5)).to.equal(2);
  });

  it('processes instruction', () => {
    expect(valueAfterFirst(3)).to.equal(1226);
    expect(valueAfterFirst(363, 50000000)).to.equal(1080289);
    expect(valueAfterFirst(3, 2017)).to.equal(1226);
  });
});
