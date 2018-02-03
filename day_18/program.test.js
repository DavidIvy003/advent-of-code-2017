const expect = require('chai').expect;
const fs = require('fs');

const Program = require('./dist/program').Program;

describe('Program', () => {
  it('gets the send value', () => {
    const testInstructions = fs.readFileSync('input/example_01.txt').toString().split("\n");
    program = new Program(testInstructions);
    program.processInstructions();
    expect(program.sendValue).to.equal(4);
  });
});
