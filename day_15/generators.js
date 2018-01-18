
const MOD = 2147483647;
const GENERATOR_A_FACTOR = 16807;
const GENERATOR_B_FACTOR = 48271;

const toBinary = (input) => input.toString(2);
const padLeft = (input, length) => ('0'.repeat(length) + input).slice(-length);
const lowest16Bits = (input) => padLeft(toBinary(input), 16).slice(-16);

const valuesMatch = (valueA, valueB) => lowest16Bits(valueA) === lowest16Bits(valueB);

const countMatchedSequences = (generatorAValue, generatorBValue) => {
  let countMatches = 0;
  for (let i = 0; i < 40000000; i++) {
    generatorAValue = (generatorAValue * GENERATOR_A_FACTOR) % MOD;
    generatorBValue = (generatorBValue * GENERATOR_B_FACTOR) % MOD;
    if (valuesMatch(generatorAValue, generatorBValue)) countMatches++;
  }
  return countMatches;
};

module.exports = {
  countMatchedSequences,
};
