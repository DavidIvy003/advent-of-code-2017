const valueAfterLast = (input, rotations = 2017) => {
  const valueAfter = rotations;
  let buffer = [0];
  let currentPosition = 0;
  for (let i = 1; i <= rotations; i++) {
    currentPosition = (currentPosition + input) % buffer.length + 1;
    buffer.splice(currentPosition, 0, i);
  }
  return buffer[buffer.indexOf(valueAfter) + 1];
};

const valueAfterFirst = (input, rotations = 2017) => {
  let length = 1;
  let value;
  let currentPosition = 0;
  for (let i = 1; i <= rotations; i++) {
    currentPosition = (currentPosition + input) % length + 1;
    if (currentPosition === 1) value = i;
    length++;
  }
  return value;
};

module.exports = {
  valueAfterLast,
  valueAfterFirst,
};
