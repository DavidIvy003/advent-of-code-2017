const expect = require('chai').expect;
const fs = require('fs');

const {
  getFractalArtOuput,
  countOnPixels,
} = require('./dist/fractalArt');

describe('Fractal Art', () => {
  describe('getFractalArtOuput', () => {
    it('iterates the art from example input', () => {
      const testInstructions = fs.readFileSync('input/example_01.txt').toString();
      const testOutput = fs.readFileSync('input/example_output_01.txt').toString();
      expect(getFractalArtOuput(testInstructions, 1)).to.equal(testOutput);
    });

    it('iterates the art from example input', () => {
      const testInstructions = fs.readFileSync('input/example_01.txt').toString();
      const testOutput = fs.readFileSync('input/example_output_02.txt').toString();
      expect(getFractalArtOuput(testInstructions, 2)).to.equal(testOutput);
    });

    it('iterates the art from puzzle input', () => {
      const testInstructions = fs.readFileSync('input/puzzle_input.txt').toString();
      const testOutput = fs.readFileSync('input/puzzle_output.txt').toString();
      expect(getFractalArtOuput(testInstructions)).to.equal(testOutput);
    });

    it.skip('iterates the art from puzzle input for 18 iterations', () => {
      // This test takes forever to run, don't do it
      const testInstructions = fs.readFileSync('input/puzzle_input.txt').toString();
      const testOutput = fs.readFileSync('input/puzzle_output.txt').toString();
      expect(getFractalArtOuput(testInstructions, 18)).to.equal(1277716);
    });
  });

  describe('countOnPixels', () => {
    it('counts the number of one pixels for example input', () => {
      const input = fs.readFileSync('input/example_output_01.txt').toString();
      expect(countOnPixels(input)).to.equal(4);
    });

    it('counts the number of one pixels for example input', () => {
      const input = fs.readFileSync('input/example_output_02.txt').toString();
      expect(countOnPixels(input)).to.equal(12);
    });

    it('counts the number of one pixels for puzzle input', () => {
      const input = fs.readFileSync('input/puzzle_output.txt').toString();
      expect(countOnPixels(input)).to.equal(110);
    });
  });
});


