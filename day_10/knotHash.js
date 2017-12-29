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

const knotHash = (input, size = 256) => {
  const lengths = input.split(',');
  let list = Array.from(Array(size).keys());
  let skipSize = 0;
  let currentPosition = 0;
  lengths.forEach((length) => {
    // console.log(`length=${length}`)
    // console.log(`currentPosition=${currentPosition}`)
    // console.log(`skipSize=${skipSize}`)
    // console.log(`input list=${list.toString()}`)
    list = reverseListSection(list, currentPosition, +length);
    // console.log(`output list=${list.toString()}`)
    currentPosition = (currentPosition + +length + skipSize) % list.length;
    skipSize++;
  });
  return list;
};

const verify = (list) => list[0] * list[1];

module.exports = {
  knotHash,
  reverseListSection,
  verify,
};
