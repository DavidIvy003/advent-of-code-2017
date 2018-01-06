const reverseListSection = (list, currentPosition, length) => {
  const begining = currentPosition;
  const end = (currentPosition + length) % list.length;

  if (length === 0) {
    return list;
  } else if (begining >= end) {
    const arr = list.slice(begining, list.length).concat(list.slice(0, end)).reverse();
    return [...arr.slice(arr.length - end, arr.length),
            ...list.slice(end, begining),
            ...arr.slice(0, arr.length - end)];
  } else {
    return [...list.slice(0, begining),
            ...list.slice(begining, end).reverse(),
            ...list.slice(end, list.length)];
  }
};

const evaluateRound = (lengths, sparseHash, currentPosition = 0, skipSize = 0) => {
  lengths.forEach((length) => {
    // console.log(`length=${length}`)
    // console.log(`currentPosition=${currentPosition}`)
    // console.log(`skipSize=${skipSize}`)
    // console.log(`input list=${list.toString()}`)
    sparseHash = reverseListSection(sparseHash, currentPosition, +length);
    // console.log(`output list=${list.toString()}`)
    currentPosition = (currentPosition + +length + skipSize) % sparseHash.length;
    skipSize++;
  });
  return {
    sparseHash,
    currentPosition,
    skipSize,
  };
};

const knotHash = (input, size = 256) => {
  let sparseHash = Array.from(Array(size).keys());
  let lengths = encode(input);
  let skipSize = 0;
  let currentPosition = 0;
  for (i = 0; i < 64; i++) {
    const output = evaluateRound(lengths, sparseHash, currentPosition, skipSize);
    sparseHash = output.sparseHash;
    skipSize = output.skipSize;
    currentPosition = output.currentPosition;
  }

  return convertToHexadecimal(getDenseHash(sparseHash));
};

const xOr = (input) => {
  let result;
  for (let i = 0; i < 16; i++) {
    result = result ^ input[i];
  }
  return result;
};

const getDenseHash = (sparseHash) => {
  let result = [];
  for (i = 0; i < sparseHash.length; i += 16) {
    result.push(xOr(sparseHash.slice(i, i + 16)));
  }
  return result;
};

const hexadecimal = (num) => (num.length === 2 ? num : `0${num}`)
const convertToHexadecimal = (array) => array.map(num => hexadecimal(num.toString(16))).join('');
const encode = (input) => [...input.split('').map(c => c.charCodeAt(0)), 17, 31, 73, 47, 23];
const verify = (list) => list[0] * list[1];

module.exports = {
  encode,
  evaluateRound,
  getDenseHash,
  knotHash,
  reverseListSection,
  verify,
};
