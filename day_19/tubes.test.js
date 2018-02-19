const expect = require('chai').expect;
const fs = require('fs');

const {
  getPath,
  getStepCount,
} = require('./dist/tubes');

describe('getPath', () => {
  it('goes in the down direction', () => {
    const testInstructions = fs.readFileSync('input/down.txt').toString();
    expect(getPath(testInstructions)).to.equal('DOWN');
  });

  it('goes in the right direction', () => {
    const testInstructions = fs.readFileSync('input/right.txt').toString();
    expect(getPath(testInstructions)).to.equal('RIGHT');
  });

  it('goes in the left direction', () => {
    const testInstructions = fs.readFileSync('input/left.txt').toString();
    expect(getPath(testInstructions)).to.equal('LEFT');
  });

  it('goes in the up direction', () => {
    const testInstructions = fs.readFileSync('input/up.txt').toString();
    expect(getPath(testInstructions)).to.equal('UP');
  });

  it('can cross over other tubes', () => {
    const testInstructions = fs.readFileSync('input/example_01.txt').toString();
    expect(getPath(testInstructions)).to.equal('ABCDEF');
  });

  it('can handle puzzle input', () => {
    const testInstructions = fs.readFileSync('input/example_02.txt').toString();
    expect(getPath(testInstructions)).to.equal('PVBSCMEQHY');
  });
});

describe('getStepCount', () => {
  it('can cross over other tubes', () => {
    const testInstructions = fs.readFileSync('input/example_01.txt').toString();
    expect(getStepCount(testInstructions)).to.equal(38);
  });

  it('can handle puzzle input', () => {
    const testInstructions = fs.readFileSync('input/example_02.txt').toString();
    expect(getStepCount(testInstructions)).to.equal(17736);
  });
});
