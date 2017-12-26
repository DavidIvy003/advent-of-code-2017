const fs = require('fs');

const MANIPULATE_REGISTER_REGEX = /^(\w*)\s/
const MANIPULATE_OPERATOR_REGEX = /^\w*\s(inc|dec)/
const MANIPULATE_CHANGE_REGEX = /^[\w\s]*\s(.+)\sif/
const COMPARISON_REGISTER_REGEX = /if\s(\w*)\s[!=<>]/
const OPERATOR_REGEX = /if\s\w*\s([!=<>]*)/
const COMPARITOR_REGEX = /if\s\w*\s[!=<>]*\s(.*)/

const registerValue = (registers, id) =>
  registers[id] || 0;

const modifyRegister = (instruction, registers) => {
  const register = MANIPULATE_REGISTER_REGEX.exec(instruction)[1];
  const operator = MANIPULATE_OPERATOR_REGEX.exec(instruction)[1];
  const change = +MANIPULATE_CHANGE_REGEX.exec(instruction)[1];
  switch(operator) {
    case 'inc':
      return {
        ...registers,
        [register]: registerValue(registers, register) + change,
      };
    case 'dec':
      return {
        ...registers,
        [register]: registerValue(registers, register) - change,
      };
    default:
      throw(`Unknow operator: ${operator}`);
  }
};

const checkComparison = (instruction, registers) => {
  const register = COMPARISON_REGISTER_REGEX.exec(instruction)[1];
  const operator = OPERATOR_REGEX.exec(instruction)[1];
  const comparitor = +COMPARITOR_REGEX.exec(instruction)[1];
  switch(operator) {
    case '==':
      return registerValue(registers, register) === comparitor;
    case '!=':
      return registerValue(registers, register) !== comparitor;
    case '>':
      return registerValue(registers, register) > comparitor;
    case '>=':
      return registerValue(registers, register) >= comparitor;
    case '<':
      return registerValue(registers, register) < comparitor;
    case '<=':
      return registerValue(registers, register) <= comparitor;
    default:
      throw(`Unknow operator: ${operator}`);
  }
};

const highestRegisterValue = (registers) => Math.max(...Object.values(registers));

const modifyRegisters = (fileUrl) => {
  const input = fs.readFileSync(fileUrl).toString().trim();
  const instructions = input.split("\n");
  let registers = {};
  instructions.forEach((instruction) => {
    if (checkComparison(instruction, registers)) {
      registers = modifyRegister(instruction, registers);
    }
  });
  return registers;
};

module.exports = {
  highestRegisterValue,
  modifyRegisters,
};
