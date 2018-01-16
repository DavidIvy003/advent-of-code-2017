const KnotHash = require('../day_10/knotHash');

const {
  knotHash,
} = KnotHash;

const hexToBinary = (input) => input.split('').map((char) => parseInt(char, 16).toString(2)).join('');

const countBitsUsed = (input) =>
  [...Array(128)].reduce((sum, _, i) =>
    sum + hexToBinary(knotHash(`${input}-${i}`)).match(/1/g).length
  , 0);

module.exports = {
  countBitsUsed,
};
