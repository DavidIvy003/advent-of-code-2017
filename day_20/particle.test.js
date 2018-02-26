const expect = require('chai').expect;
const fs = require('fs');

const {
  getClosestParticle,
  removeCollisions,
} = require('./dist/particle');

describe('getClosestParticle', () => {
  it('finds the closest particle from example input', () => {
    const testInstructions = fs.readFileSync('input/example_01.txt').toString();
    expect(getClosestParticle(testInstructions)).to.equal(0);
  });

  it('finds the closest particle from example input', () => {
    const testInstructions = fs.readFileSync('input/example_02.txt').toString();
    expect(getClosestParticle(testInstructions)).to.equal(0);
  });

  it('finds the closest particle from puzzle input', () => {
    const testInstructions = fs.readFileSync('input/example_03.txt').toString();
    expect(getClosestParticle(testInstructions)).to.equal(258);
  });
});

describe('removeCollisions', () => {
  it('finds the closest particle from example input', () => {
    const testInstructions = fs.readFileSync('input/example_01.txt').toString();
    expect(removeCollisions(testInstructions)).to.equal(2);
  });

  it('finds the closest particle from example input', () => {
    const testInstructions = fs.readFileSync('input/example_02.txt').toString();
    expect(removeCollisions(testInstructions)).to.equal(2);
  });

  it('finds the closest particle from example input', () => {
    const testInstructions = fs.readFileSync('input/example_04.txt').toString();
    expect(removeCollisions(testInstructions)).to.equal(1);
  });

  it('finds the closest particle from puzzle input', () => {
    const testInstructions = fs.readFileSync('input/example_03.txt').toString();
    expect(removeCollisions(testInstructions)).to.equal(707);
  });
});
