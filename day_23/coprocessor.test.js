const expect = require('chai').expect;
const fs = require('fs');

const {
  getMultiplicationsCount,
  processInstructions,
} = require('./dist/coprocessor');

describe('Sporifica Virus', () => {
  describe('processInstructions', () => {
    it('sets the register', () => {
      const expected = {
        'b': 93,
      };
      expect(processInstructions('set b 93').registers).to.deep.equal(expected);
    });

    it('subtracts the register', () => {
      const expected = {
        'b': 90,
      };
      expect(processInstructions('set b 93\nsub b 3').registers).to.deep.equal(expected);
    });

    it('multiples the register', () => {
      const expected = {
        'b': 120,
      };
      expect(processInstructions('set b 10\nmul b 12').registers).to.deep.equal(expected);
    });

    it('jumps the register', () => {
      const expected = {
        'b': 10,
      };
      expect(processInstructions('set b 10\njnz 1 2\nmul b 12').registers).to.deep.equal(expected);
    });

    it('does not jump if first value is zero', () => {
      const expected = {
        'b': 0,
        'c': 10,
      };
      expect(processInstructions('set b 0\njnz b 2\nset c 10').registers).to.deep.equal(expected);
    });
  });

  describe('getMultiplicationsCount', () => {
    it('gets the multiplication count', () => {
      const output = processInstructions('set b 10\nmul b 12');
      expect(getMultiplicationsCount(output)).to.deep.equal(1);
    });

    it('gets the multiplication count', () => {
      const testInstructions = fs.readFileSync('input/puzzle_input.txt').toString();
      const output = processInstructions(testInstructions);
      expect(getMultiplicationsCount(output)).to.deep.equal(8281);
    });
  });
});


