
const MOD = 2147483647;
const GENERATOR_A_FACTOR = 16807;
const GENERATOR_B_FACTOR = 48271;
const GENERATOR_A_MULTIPLE = 4;
const GENERATOR_B_MULTIPLE = 8;


const toBinary = (input) => input.toString(2);
const padLeft = (input, length) => ('0'.repeat(length) + input).slice(-length);
const lowest16Bits = (input) => padLeft(toBinary(input), 16).slice(-16);

const valuesMatch = (valueA, valueB) => lowest16Bits(valueA) === lowest16Bits(valueB);
const getGeneatorValue = (input, factor) => (input * factor) % MOD;

const getNextGeneratorValue = (input, factor, multiple, independentGenerators) => {
  let value = getGeneatorValue(input, factor);
  if (!independentGenerators) return value;

  while (value % multiple !== 0) {
    value = getGeneatorValue(value, factor);
  }
  return value;
};

const countMatchedSequences = (generatorAValue, generatorBValue, independentGenerators = false) => {
  let countMatches = 0;
  const numberOfTrials = independentGenerators ? 5000000 : 40000000;
  for (let i = 0; i < numberOfTrials; i++) {
    generatorAValue = getNextGeneratorValue(generatorAValue, GENERATOR_A_FACTOR, GENERATOR_A_MULTIPLE, independentGenerators);
    generatorBValue = getNextGeneratorValue(generatorBValue, GENERATOR_B_FACTOR, GENERATOR_B_MULTIPLE, independentGenerators);
    if (valuesMatch(generatorAValue, generatorBValue)) countMatches++;
  }
  return countMatches;
};

module.exports = {
  countMatchedSequences,
};
