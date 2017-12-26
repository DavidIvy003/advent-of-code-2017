const expect = require('chai').expect;
const Registers = require('./registers');
const { highestRegisterValue, modifyRegisters } = Registers;

describe('registers', () => {
  describe('modifyRegisters', () => {
    it('builds the registers from an input value', () => {
      const registers = modifyRegisters('input/example_01.txt').registers;
      expect(registers).to.deep.equal({
        'a': 1,
        'c': -10,
      });
    });

    it('keeps track of the highest register value seen for example input', () => {
      const highestEverRegisterValue = modifyRegisters('input/example_01.txt').highestEverRegisterValue;
      expect(highestEverRegisterValue).to.deep.equal(10);
    });

    it('keeps track of the highest register value seen for puzzle input', () => {
      const highestEverRegisterValue = modifyRegisters('input/example_02.txt').highestEverRegisterValue;
      expect(highestEverRegisterValue).to.deep.equal(5471);
    });
  });

  describe('highestRegister', () => {
    it('finds the highest register value for example input', () => {
      const registers = modifyRegisters('input/example_01.txt').registers;
      const value = highestRegisterValue(registers);
      expect(value).to.equal(1);
    });

    it('finds the highest register value for puzzle input', () => {
      const registers = modifyRegisters('input/example_02.txt').registers;
      const value = highestRegisterValue(registers);
      expect(value).to.equal(4877);
    });
  });
});
