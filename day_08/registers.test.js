const expect = require('chai').expect;
const Registers = require('./registers');
const { highestRegisterValue, modifyRegisters } = Registers;

describe('registers', () => {
  describe('modifyRegisters', () => {
    it('builds the registers from an input value', () => {
      const registers = modifyRegisters('input/example_01.txt');
      expect(registers).to.deep.equal({
        'a': 1,
        'c': -10,
      });
    });
  });

  describe('highestRegister', () => {
    it('finds the highest register value', () => {
      const registers = modifyRegisters('input/example_01.txt');
      const value = highestRegisterValue(registers);
      expect(value).to.equal(1);
    });

    it('finds the highest register value', () => {
      const registers = modifyRegisters('input/example_02.txt');
      const value = highestRegisterValue(registers);
      expect(value).to.equal(4877);
    });
  });
});
