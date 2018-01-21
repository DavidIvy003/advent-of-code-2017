const expect = require('chai').expect;
const fs = require('fs');

const DancingPrograms = require('./dancingPrograms');

const {
  dancingPrograms,
  processInstruction,
} = DancingPrograms;

describe('DancingPrograms', () => {
  it('processes instruction', () => {
    let programs = ['a', 'b', 'c', 'd', 'e'];
    expect(processInstruction('s3', programs)).to.deep.equal(['c', 'd', 'e', 'a', 'b']);
    expect(processInstruction('x3/4', programs)).to.deep.equal(['a', 'b', 'c', 'e', 'd']);
    expect(processInstruction('pe/b', programs)).to.deep.equal(['a', 'e', 'c', 'd', 'b']);
  });

  it('runs the instructions and returns the program order', () => {
    const input = fs.readFileSync('input/puzzle_input.txt').toString().trim();
    expect(dancingPrograms('s1,x3/4,pe/b', 1, 'abcde')).to.equal('baedc');
    expect(dancingPrograms(input)).to.equal('dcmlhejnifpokgba');
  });

  it('runs the instructions repeatedly with option input', () => {
    const input = fs.readFileSync('input/puzzle_input.txt').toString().trim();
    expect(dancingPrograms('s1,x3/4,pe/b', 2, 'abcde')).to.equal('ceadb');
    expect(dancingPrograms(input, 100)).to.equal('lfocdmjpbkniaehg');
    // expect(dancingPrograms(input, 1000000000)).to.equal('ifocbejpdnklamhg');
  });
});
