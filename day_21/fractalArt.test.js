const expect = require('chai').expect;
const fs = require('fs');

const {
  getFractalArtOuput,
  countOnPixels,
} = require('./dist/fractalArt');

describe('Fractal Art', () => {
  describe('getFractalArtOuput', () => {
    it('finds the closest particle from example input', () => {
      const testInstructions = fs.readFileSync('input/example_01.txt').toString();
      const testOutput = fs.readFileSync('input/example_output_01.txt').toString();
      expect(getFractalArtOuput(testInstructions, 1)).to.equal(testOutput);
    });

    it('finds the closest particle from example input', () => {
      const testInstructions = fs.readFileSync('input/example_01.txt').toString();
      const testOutput = fs.readFileSync('input/example_output_02.txt').toString();
      expect(getFractalArtOuput(testInstructions, 2)).to.equal(testOutput);
    });

    it('finds the closest particle from example input', () => {
      const testInstructions = fs.readFileSync('input/puzzle_input.txt').toString();
      const testOutput = fs.readFileSync('input/puzzle_output.txt').toString();
      expect(getFractalArtOuput(testInstructions)).to.equal(testOutput);
    });
  });

  describe('countOnPixels', () => {
    it('finds the closest particle from example input', () => {
      const input = fs.readFileSync('input/example_output_01.txt').toString();
      expect(countOnPixels(input)).to.equal(4);
    });

    it('finds the closest particle from example input', () => {
      const input = fs.readFileSync('input/example_output_02.txt').toString();
      expect(countOnPixels(input)).to.equal(12);
    });

    it('finds the closest particle from example input', () => {
      const input = fs.readFileSync('input/puzzle_output.txt').toString();
      expect(countOnPixels(input)).to.equal(110);
    });
  });
});


